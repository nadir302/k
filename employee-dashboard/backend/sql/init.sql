-- Departments and employees with sample data
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
  salary NUMERIC(12,2),
  hired_at DATE DEFAULT CURRENT_DATE
);

INSERT INTO departments (name) VALUES ('Engineering') ON CONFLICT DO NOTHING;
INSERT INTO departments (name) VALUES ('Sales') ON CONFLICT DO NOTHING;
INSERT INTO departments (name) VALUES ('HR') ON CONFLICT DO NOTHING;
