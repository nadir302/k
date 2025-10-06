import pool from '../db.js';

export async function getNotesByUser(userId) {
  const res = await pool.query(`SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC`, [userId]);
  return res.rows;
}

export async function createNote({ userId, title, content }) {
  const res = await pool.query(
    `INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *`,
    [userId, title, content]
  );
  return res.rows[0];
}

export async function updateNote({ id, userId, title, content }) {
  const res = await pool.query(
    `UPDATE notes SET title=$1, content=$2, updated_at=now() WHERE id=$3 AND user_id=$4 RETURNING *`,
    [title, content, id, userId]
  );
  return res.rows[0];
}

export async function deleteNote({ id, userId }) {
  const res = await pool.query(`DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING id`, [id, userId]);
  return res.rows[0];
}
