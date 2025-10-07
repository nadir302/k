import pool from '../db.js';

export async function createUser({ name, email, password }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
    [name, email, password]
  );
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return res.rows[0];
}

export async function findUserById(id) {
  const res = await pool.query(`SELECT id, name, email FROM users WHERE id = $1`, [id]);
  return res.rows[0];
}
