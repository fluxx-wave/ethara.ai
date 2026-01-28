import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../api';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; 
ModuleRegistry.registerModules([AllCommunityModule]);
import { User, Plus, X, Trash2, Edit, MoreVertical } from 'lucide-react';
import StatsCard from '../components/StatsCard';

const Employees = () => {
    const [employee, SetEmp] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null); // Track which employee is being deleted
    const [formData, setFormData] = useState({
        emp_id: '',
        name: '',
        email_address: '',
        department_id: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const fetchEmployees = () => {
        api.get("employee")
            .then((res) => {
                console.log(res);
                SetEmp(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchDepartments = () => {
        api.get("departments") 
            .then((res) => {
                setDepartments(res.data);
            })
            .catch((err) => {
                console.log("Error fetching departments:", err);
            });
    };

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
       
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.emp_id.trim()) {
            errors.emp_id = 'Employee ID is required';
        }
        
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        
        if (!formData.email_address.trim()) {
            errors.email_address = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email_address)) {
            errors.email_address = 'Email is invalid';
        }
        
        if (!formData.department_id) {
            errors.department_id = 'Department is required';
        }
        
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        setLoading(true);
        
        api.post("add-emp", formData)
            .then((res) => {
                console.log("Employee added successfully:", res.data);
                
                setFormData({
                    emp_id: '',
                    name: '',
                    email_address: '',
                    department_id: ''
                });
                setFormErrors({});
                setShowModal(false);
                
                fetchEmployees();
                
                alert('Employee added successfully!');
            })
            .catch((err) => {
                console.error("Error adding employee:", err.response);
                
                if (err.response && err.response.data) {
                    if (err.response.data.errors) {
                        setFormErrors(err.response.data.errors);
                    } else if (err.response.data.message) {
                        alert(err.response.data.message);
                    }
                } else {
                    alert('Failed to add employee. Please try again.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Function to delete an employee
    const handleDeleteEmployee = (id, empId, name) => {
        if (!window.confirm(`Are you sure you want to delete employee ${empId} - ${name}?`)) {
            return;
        }
        
        setDeleteLoading(id);
        
        api.delete(`del-emp/${id}/`) // Update this endpoint based on your backend
            .then((res) => {
                if (res.data.success) {
                    alert(`Employee ${name} deleted successfully!`);
                    // Remove the deleted employee from the state
                    SetEmp(prev => prev.filter(emp => emp.id !== id));
                } else {
                    alert(`Failed to delete: ${res.data.message}`);
                }
            })
            .catch((err) => {
                console.error("Delete error:", err);
                if (err.response && err.response.data) {
                    alert(`Error: ${err.response.data.message || 'Failed to delete employee'}`);
                } else {
                    alert('Failed to delete employee. Please try again.');
                }
            })
            .finally(() => {
                setDeleteLoading(null);
            });
    };

    // Action cell renderer for AG Grid
    const ActionCellRenderer = (params) => {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleDeleteEmployee(
                        params.data.id, 
                        params.data.emp_id, 
                        params.data.name
                    )}
                    disabled={deleteLoading === params.data.id}
                    className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-3 py-1 rounded-md text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {deleteLoading === params.data.id ? (
                        <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                            Deleting...
                        </>
                    ) : (
                        <>
                            <Trash2 size={14} />
                            Delete
                        </>
                    )}
                </button>
            </div>
        );
    };

    const columnDefs = [
        { headerName: "ID", field: "id", sortable: true, width: 80 },
        { headerName: "Employee ID", field: "emp_id", sortable: true, filter: true },
        { headerName: "Name", field: "name", filter: true },
        { 
            headerName: "Department", 
            field: "department", 
            filter: true,
            valueGetter: (params) => params.data.department?.department_name || 'N/A'
        },
        { headerName: "Email", field: "email_address", filter: true },
        { 
            headerName: "Created At", 
            field: "created_at", 
            filter: true,
            valueFormatter: (params) => {
                if (params.value) {
                    return new Date(params.value).toLocaleDateString();
                }
                return '';
            }
        },
        {
            headerName: "Actions",
            field: "actions",
            width: 200,
            cellRenderer: ActionCellRenderer,
            sortable: false,
            filter: false,
            pinned: 'right'
        }
    ];

    return (
        <div className='p-4'>
           
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                    <Plus size={18} />
                    Add Employee
                </button>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatsCard 
                    title='Total Employees' 
                    icon={<User size={20} />} 
                    Value={employee.length} 
                />
            </div>

           
            <div className='mt-5'>
                <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
                    <AgGridReact
                        rowData={employee}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                        suppressCellFocus={true}
                        defaultColDef={{
                            resizable: true,
                            sortable: true,
                            filter: true,
                        }}
                    />
                </div>
            </div>

          
            {showModal && (
                <div className=" transition-all duration-700 ease-in-out fixed inset-0  bg-opacity-10 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                 
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Employee</h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setFormErrors({});
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                      
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                               
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Employee ID *
                                    </label>
                                    <input
                                        type="text"
                                        name="emp_id"
                                        value={formData.emp_id}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            formErrors.emp_id ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter employee ID"
                                    />
                                    {formErrors.emp_id && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.emp_id}</p>
                                    )}
                                </div>

                              
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            formErrors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter full name"
                                    />
                                    {formErrors.name && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                                    )}
                                </div>

                              
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email_address"
                                        value={formData.email_address}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            formErrors.email_address ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter email address"
                                    />
                                    {formErrors.email_address && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.email_address}</p>
                                    )}
                                </div>

                               
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department *
                                    </label>
                                    <select
                                        name="department_id"
                                        value={formData.department_id}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                            formErrors.department_id ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.department_name}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.department_id && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.department_id}</p>
                                    )}
                                </div>
                            </div>

                       
                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setFormErrors({});
                                    }}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        'Add Employee'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;