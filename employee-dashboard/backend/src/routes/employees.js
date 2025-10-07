import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { q, department } = req.query;
    let sql = 'SELECT e.*, d.name as department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id';
    const where = [];
    const params = [];
    if (q) { params.push(`%${q}%`); where.push(`(first_name ILIKE $${params.length} OR last_name ILIKE $${params.length} OR email ILIKE $${params.length})`); }
    if (department) { params.push(department); where.push(`department_id = $${params.length}`); }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    sql += ' ORDER BY hired_at DESC LIMIT 200';
    const r = await pool.query(sql, params);
    res.json({ employees: r.rows });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { first_name, last_name, email, department_id, salary } = req.body;
    const r = await pool.query(
      'INSERT INTO employees (first_name, last_name, email, department_id, salary) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [first_name, last_name, email, department_id || null, salary || null]
    );
    res.status(201).json({ employee: r.rows[0] });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, email, department_id, salary } = req.body;
    const r = await pool.query(
      'UPDATE employees SET first_name=$1,last_name=$2,email=$3,department_id=$4,salary=$5 WHERE id=$6 RETURNING *',
      [first_name, last_name, email, department_id || null, salary || null, id]
    );
    if (!r.rows[0]) return res.status(404).json({ message: 'Not found' });
    res.json({ employee: r.rows[0] });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM employees WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
