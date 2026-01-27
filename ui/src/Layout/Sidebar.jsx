import React from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard,CalendarPlus ,User } from 'lucide-react';


function Sidebar() {
  return (
    <div className=' h-full flex flex-col items-center border-e border-slate-200 bg-white fixed w-40 top-0 shadow-lg '>
        <div className='bg-violet-100 p-3 rounded-xl h-15 text-violet-800 m-3 mt-6 font-bold text-xl'>HRMS</div>
        
        <div className='transition ease-in-out border-t py-2 border-slate-200 w-full flex flex-col items-center'>
            <p className='transition ease-in-out flex items-center gap-1 w-full p-2 text-center hover:bg-violet-50 hover:text-violet-800'>
                 <LayoutDashboard size={18} className='text-violet-800  '  /> 
                 <Link to='/dashboard' > Dashboard </Link>
            </p>
            <p className='transition ease-in-out flex items-center gap-1 w-full p-2 text-center hover:bg-violet-50 hover:text-violet-800'>
                 <User size={18} className='text-violet-800  '  /> 
                 <Link to='/employees' > Employee </Link>
            </p>
            <p className='transition ease-in-out flex items-center gap-1 w-full p-2 text-center hover:bg-violet-50 hover:text-violet-800'>
                 <CalendarPlus  size={18} className='text-violet-800  '  /> 
                 <Link to='/attendance' > Attendance </Link>
            </p>
            <p className='transition ease-in-out flex items-center gap-1 w-full p-2 text-center hover:bg-violet-50 hover:text-violet-800'>
                 <CalendarPlus  size={18} className='text-violet-800  '  /> 
                 <Link to='/mark-att' > Mark Atten.. </Link>
            </p>

     
        </div>
        
    </div>
  )
}

export default Sidebar