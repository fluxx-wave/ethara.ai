import { useState } from 'react'
import {BrowserRouter, Router,Routes,Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import MarkAttendance from './pages/MarkAttendance'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}  >

          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/mark-att" element={<MarkAttendance />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
