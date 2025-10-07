import express from 'express';
import pool from '../db.js';
const router = express.Router();

// Basic stats: employees per department, average salary per department
router.get('/', async (req, res, next) => {
  try {
    const perDept = await pool.query(`
      SELECT d.id, d.name, COUNT(e.id) as employees_count, AVG(e.salary)::numeric::float8 as avg_salary
      FROM departments d LEFT JOIN employees e ON e.department_id = d.id
      GROUP BY d.id, d.name ORDER BY d.name
    `);
    const totals = await pool.query(`SELECT COUNT(*)::int as total_employees FROM employees`);
    res.json({ perDepartment: perDept.rows, totals: totals.rows[0] });
  } catch (err) { next(err); }
});

export default router;
