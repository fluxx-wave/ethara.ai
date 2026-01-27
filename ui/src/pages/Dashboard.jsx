import React from 'react'
import { useState,useEffect } from 'react';
import api from '../api';
import { LayoutDashboard,CalendarPlus ,User } from 'lucide-react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import StatsCard from '../components/StatsCard';

function Dashboard() {

  const [employee,SetEmp ] = useState([]) 
  const [departments,SetDept ] = useState([]) 
  const [date, setDate] = useState(new Date());


  useEffect(()=>{

    api.get("employee")
    .then((res)=>{
      console.log(res)
      SetEmp(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

    api.get("departments")
    .then((res)=>{
      console.log(res)
      SetDept(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    

  },[])


  return (
    <div className='p-2 w-full h-full'>

      <div id="cards" className='grid grid-cols-6'>
        <StatsCard title='Employees' icon={<User size={15} />} Value={employee.length ? employee.length : 0 } />
        <StatsCard title='Departments' icon={<LayoutDashboard size={15} />} Value={departments.length ? departments.length : 0} />
      </div>

      <div className=' flex items-start mt-6'>

        {/* List cards */}
        <div className='rounded grid grid-cols-2 gap-5 mx-2 '>
          <ListCard title={"Employees"} icon={<User size={15} />} 
            renderList={()=>(
              employee.map((emp)=>(
                <div key={emp.id} className=' transition ease-in-out border-b border-slate-200 p-2 hover:bg-violet-100 hover:text-violet-800' > 
                  {emp.emp_id}  {emp.name} 
                </div>
              ))
              )} 
          />

          <ListCard title={"Departments"} icon={<User size={15} />} 
            renderList={()=>(
              departments.map((dept)=>(
                <div key={dept.id} className=' transition ease-in-out border-b border-slate-200 p-2 hover:bg-violet-100 hover:text-violet-800' > 
                  {dept.dep_id} {dept.department_name} 
                </div>
              ))
              )} 
          />
         

        </div>

        <div>
         
          <Calendar
              onChange={setDate}
              value={date}
              className='rounded border border-slate-200'
            />
        </div>

      </div>


    </div>
  )
}










const ListCard = ({title,icon,renderList}) =>{
  return (
    <div className='transition ease-in-out p-3 shadow border border-slate-200 w-100 rounded '>
      <p className='flex items-center' >  <span className='bg-violet-200 p-1 rounded-md mx-2 text-violet-800'> {icon} </span>   {title} </p>
      <div className='my-3 px-2 py-2 transition ease-in-out overflow-y-scroll '> 
         {renderList && renderList() }
      </div>
    </div>
  )

}







export default Dashboard





