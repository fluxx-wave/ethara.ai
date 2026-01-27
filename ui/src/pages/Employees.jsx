import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../api';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; 
ModuleRegistry.registerModules([AllCommunityModule]);
import { User } from 'lucide-react';
import StatsCard from '../components/StatsCard';



const Employees = () => {

    const [employee,SetEmp ] = useState([]) 


    useEffect(()=>{
        api.get("employee")
        .then((res)=>{
          console.log(res)
          SetEmp(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

    },[])


    const columnDefs = [
        { headerName: "ID", field: "id", sortable: true },
        { headerName: "Name", field: "name", filter: true },
        { headerName: "Department", field: "department",filter: true },
        { headerName: "Email", field: "email_address",filter: true },
        { headerName: "Created At", field: "created_at",filter: true },
    ];


  return (
    <div className='' > <br />

        <div className="grid grid-cols-6">
            < StatsCard title='Total Employee' icon={<User size={15} />} Value={employee.length} />
        </div>


        <div className='flex-1 mt-5 w-10/11'>
            <AgGridReact
                rowData={employee}
                columnDefs={columnDefs}
                domLayout="autoHeight"
            />

        </div>
    </div>

  )
}


export default Employees
