import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'

export default function App() {
  return (
    <div style={{ maxWidth: 1100, margin: '20px auto', padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <Link to="/">Dashboard</Link> | <Link to="/employees">Employees</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  )
}
