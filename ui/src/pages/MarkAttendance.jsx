import React from "react";
import api from "../api";
import { useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule]);

const MarkAttendance = () => {
  
  const [employee, SetEmp] = useState([]);
  const [formData,SetFormData] = useState({
    date: '',
    present: [],
    absent : [],
    marked_by : '',

  })

    const handleDateChange = (e) => {
        SetFormData(prev => ({
            ...prev,
            date: e.target.value   
        }));
        console.log(formData)
    };


const handleAttendanceChange = (e, empId) => {
    const isChecked = e.target.checked;

    SetFormData((prev) => {
      let present = [...prev.present];

      if (isChecked) {
        // Add to present if not already there
        if (!present.includes(empId)) {
          present.push(empId);
        }
      } else {
        // Remove from present
        present = present.filter((id) => id !== empId);
      }

      return {
        ...prev,
        present,
        // absent: employees.map(e => e.emp_id).filter(id => !present.includes(id)) → optional
      };
    });
  };

  const handleSave = () => {
    if (!formData.date) {
      alert("Please select a date first");
      return;
    }

    const payload = {
      date: formData.date,
      present: formData.present,
      absent: employee
        .map((emp) => emp.emp_id)
        .filter((id) => !formData.present.includes(id)),
      marked_by: formData.marked_by,
    };

    console.log("Payload to send:", payload);

    api.post("/mark-att", payload)
      .then(() => alert("Attendance saved!"))
      .catch(err => console.error("Save failed", err));
  };


  useEffect(() => {
    api
      .get("employee")
      .then((res) => {
        console.log(res);
        SetEmp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);



  return (
    <div>

      <div className="shadow-md p-3 ">
        <p className="my-2">Mark Attendace </p>

        <div className="my-2"> Select Date: 
            <input type="date" value={formData.date} onChange={handleDateChange}  className="rounded text-violet-900 bg-violet-100 p-1 border border-violet-400" /> 
        
            <button
                onClick={handleSave}
                disabled={!formData.date || employee.length === 0}
                className="
                mx-4
                px-2 py-1 bg-violet-600 text-white 
                rounded shadow hover:bg-violet-700
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition
                "
            >
                Save Attendance
            </button>
        </div>

        <div className="overflow-hidden shadow ring-opacity-5 rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

                {employee.map((emp,id)=>(
                    <tr key={id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900"> {emp.name} </td>
                        <td className="px-4 py-3 text-sm text-gray-600"> {emp.department} </td>
                        <td className="px-4 py-3 text-sm text-gray-600"> {emp.email_address} </td>
                        <td className="px-4 py-3 text-center">
                        <input type="checkbox" value={emp.emp_id} 
                            checked={formData.present.includes(emp.emp_id)}
                            onChange={(e) => handleAttendanceChange(e, emp.emp_id)} />
                        </td>
                    </tr>
                ))}

            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
};

export default MarkAttendance;
