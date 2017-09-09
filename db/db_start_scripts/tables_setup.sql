-- Create users table
Create table users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(80),
  password TEXT,
  firstname VARCHAR(80),
  activated BOOLEAN,
  email_validated BOOLEAN,
  validation_token TEXT,
  phone_number TEXT
);

-- Create statuses table
CREATE TABLE statuses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  emotion INTEGER,
  status TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- Create goals table
CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  goal TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reminder TIMESTAMP,
  completed BOOLEAN,
  challenge_level INTEGER,
  fulfillment_level INTEGER
);

-- Create tags table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag TEXT
);

-- Create tomorrow_thoughts table
CREATE TABLE tomorrow_thoughts (
  id SERIAL PRIMARY KEY,
  thought TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  appear_on TIMESTAMP
);

-- Create relations_to_tags table
CREATE TABLE relations_to_tag (
  id SERIAL PRIMARY KEY,
  goal_id INTEGER REFERENCES goals(id),
  tags_id INTEGER REFERENCES tags(id),
  users_id INTEGER REFERENCES users(id)
);

-- Create relations_to_completion_tags table
CREATE TABLE relations_to_completion_tags (
  id SERIAL PRIMARY KEY,
  goal_id INTEGER REFERENCES goals(id),
  tags_id INTEGER REFERENCES tags(id),
  users_id INTEGER REFERENCES users(id)
);

-- Create relations_to_tomorrow_thoughts table
CREATE TABLE relations_to_tomorrow_thoughts (
  id SERIAL PRIMARY KEY,
  goal_id INTEGER REFERENCES goals(id),
  tomorrow_thoughts_id INTEGER REFERENCES tomorrow_thoughts(id),
  users_id INTEGER REFERENCES users(id)
);