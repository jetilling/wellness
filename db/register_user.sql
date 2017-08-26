INSERT INTO users (email, password, first_name, activated, email_validated, validation_token)
VALUES ($1, $2, $3, $4, 'false', $5);