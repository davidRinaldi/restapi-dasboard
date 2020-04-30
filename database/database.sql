CREATE DATABASE dasboard;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
)

INSERT INTO users (name, email) VALUES
    ('admin1','admin1@gmail.com'),
    ('admin2','admin1@gmail.com');