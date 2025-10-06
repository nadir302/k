import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      API.setToken(res.data.token);
      navigate('/notes');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid credentials');
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <div className="mb-3">
          <input className="" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <input className="" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
