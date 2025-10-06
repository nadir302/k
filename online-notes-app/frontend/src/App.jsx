import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'
import API from './api'

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) API.setToken(token);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    API.setToken(null);
    navigate('/login');
  }

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-semibold text-gray-900">Online Notes</Link>
          <nav className="hidden sm:flex items-center gap-4 text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            {user ? (
              <Link to="/notes" className="hover:text-gray-900">My Notes</Link>
            ) : (
              <Link to="/login" className="hover:text-gray-900">Login</Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/register" className="text-sm text-blue-600 hover:text-blue-700">Register</Link>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<div className="rounded-lg border bg-white p-6 shadow-sm">Welcome — go to <Link className="text-blue-600 hover:text-blue-700" to="/notes">My Notes</Link></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
    </div>
  )
}
