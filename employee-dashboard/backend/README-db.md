Setup (Postgres)

1) Create database

  createdb employee_dashboard

2) Apply schema (psql or GUI)

  psql -d employee_dashboard -f sql/init.sql

3) Configure env

  Copy .env.example to .env and set credentials

  DATABASE_URL=postgres://postgres:your_password@localhost:5432/employee_dashboard

  or use discrete vars (PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD)

4) Run server

  npm run dev


