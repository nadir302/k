import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmployees } from '../store'
import API from '../api'
import SurfaceCard from '../components/SurfaceCard'

export default function Employees() {
  const dispatch = useDispatch()
  const employees = useSelector(s => s.employees.list)
  const status = useSelector(s => s.employees.status)
  const [q, setQ] = useState('')
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', department_id:'', salary:'' })

  useEffect(() => { dispatch(fetchEmployees({})); loadDeps(); }, [])
  async function loadDeps(){ const r = await API.get('/departments'); setDepartments(r.data.departments); }

  async function doSearch(e){ e.preventDefault(); dispatch(fetchEmployees({ q, department })); }

  function startEdit(emp){ setEditing(emp); setForm({ first_name:emp.first_name, last_name:emp.last_name, email:emp.email, department_id: emp.department_id || '', salary: emp.salary || '' }) }

  async function save(e){ e.preventDefault(); try{ if(editing){ const r = await API.put(`/employees/${editing.id}`, form); dispatch(fetchEmployees({})); setEditing(null); } else { await API.post('/employees', form); dispatch(fetchEmployees({})); } setForm({ first_name:'', last_name:'', email:'', department_id:'', salary:'' }) }catch(err){console.error(err);} }

  async function remove(id){ if(!confirm('Delete employee?')) return; await API.delete(`/employees/${id}`); dispatch(fetchEmployees({})); }

  return (
    <div>
      <h2 style={{ color: '#fff' }}>Employees</h2>
      <SurfaceCard title="Search" style={{ marginBottom: 12 }}>
        <form onSubmit={doSearch} style={{ display:'flex', gap:8 }}>
          <input placeholder="Search name or email" value={q} onChange={e=>setQ(e.target.value)} />
          <select value={department} onChange={e=>setDepartment(e.target.value)}>
            <option value="">All departments</option>
            {departments.map(d=> <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button type="submit">Search</button>
        </form>
      </SurfaceCard>

      <SurfaceCard title={editing ? 'Edit employee' : 'Add employee'} style={{ marginBottom: 12 }}>
        <form onSubmit={save}>
          <input placeholder="First name" value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} />
          <input placeholder="Last name" value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <select value={form.department_id} onChange={e=>setForm({...form, department_id:e.target.value})}>
            <option value="">No department</option>
            {departments.map(d=> <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <input placeholder="Salary" value={form.salary} onChange={e=>setForm({...form, salary:e.target.value})} />
          <button type="submit">Save</button>
          {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({ first_name:'', last_name:'', email:'', department_id:'', salary:'' })}}>Cancel</button>}
        </form>
      </SurfaceCard>

      <div>
        {status === 'loading' ? <SurfaceCard>Loading...</SurfaceCard> : (
          employees.map(emp => (
            <SurfaceCard key={emp.id} style={{ marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div>
                  <strong>{emp.first_name} {emp.last_name}</strong> — {emp.email}
                  <div style={{ fontSize:12, color:'#666' }}>{emp.department_name || 'No department'} • Hired: {new Date(emp.hired_at).toLocaleDateString()}</div>
                </div>
                <div>
                  <button onClick={()=>startEdit(emp)} style={{ marginRight:8 }}>Edit</button>
                  <button onClick={()=>remove(emp.id)}>Delete</button>
                </div>
              </div>
            </SurfaceCard>
          ))
        )}
      </div>
    </div>
  )
}
