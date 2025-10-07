import express from 'express';
import pool from '../db.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const r = await pool.query('SELECT * FROM departments ORDER BY name');
    res.json({ departments: r.rows });
  } catch (err) { next(err); }
});

export default router;
