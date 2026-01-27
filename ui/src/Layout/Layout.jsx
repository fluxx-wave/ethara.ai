import React from 'react'
import { Outlet } from "react-router-dom";
import  {Navbar}  from './Navbar';
import Sidebar from './Sidebar';


const Layout = () => {
  return (
    <div className='flex bg-white text-black w-full h-screen' > 
        
        <div className='h-full w-50 '>
            <Sidebar />
        </div>

        <div className=' w-full h-full'>
            <Navbar className='z-10' />
            <div className='mt-18  h-full w-full'>
                {<Outlet />} 
            </div>

        </div>
        
        
        
    </div>
  )
}



export default Layout ;