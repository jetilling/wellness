-- Create users table
Create table users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(80),
  password TEXT,
  firstname VARCHAR(80),
  activated BOOLEAN,
  email_validated BOOLEAN,
  validation_token TEXT
);

-- Create statuses table
CREATE TABLE statuses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  emotion INTEGER,
  status TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);