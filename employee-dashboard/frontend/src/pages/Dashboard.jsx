import React, { useEffect, useState } from 'react'
import API from '../api'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import SurfaceCard from '../components/SurfaceCard'

const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042']

export default function Dashboard() {
  const [stats, setStats] = useState({ perDepartment: [], totals: {} })

  useEffect(() => { load(); }, [])
  async function load() {
    try {
      const res = await API.get('/stats');
      setStats(res.data);
    } catch (err) { console.error(err); }
  }

  return (
    <div>
      <h2 style={{ color: '#fff' }}>Employee Dashboard</h2>
      <div className="surface-grid surface-grid-2">
        <SurfaceCard title="Employees by Department" style={{ height: 340 }}>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.perDepartment} dataKey="employees_count" nameKey="name" outerRadius={80} label>
                  {stats.perDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SurfaceCard>

        <SurfaceCard title="Average Salary per Department" style={{ height: 340 }}>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.perDepartment} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="avg_salary" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SurfaceCard>
      </div>

      <div style={{ marginTop: 20 }}>
        <SurfaceCard title="Totals">
          <div><strong>Total employees: </strong> {stats.totals?.total_employees ?? 0}</div>
        </SurfaceCard>
      </div>
    </div>
  )
}
