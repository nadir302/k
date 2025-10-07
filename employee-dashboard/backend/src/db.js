import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const {
  DATABASE_URL,
  PGHOST,
  PGPORT,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PGSSL
} = process.env;

let poolConfig = {};
if (DATABASE_URL) {
  poolConfig.connectionString = DATABASE_URL;
} else if (PGHOST || PGDATABASE) {
  poolConfig = {
    host: PGHOST || 'localhost',
    port: PGPORT ? Number(PGPORT) : 5432,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: PGSSL === 'require' ? { rejectUnauthorized: false } : undefined
  };
}

const pool = new Pool(poolConfig);
export default pool;
