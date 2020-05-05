CREATE DATABASE dasboard;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    nip VARCHAR(40),
    name VARCHAR(40),
    pass VARCHAR(255),
    instansi VARCHAR(40),
    email TEXT
);

INSERT INTO users
    (nip, name, pass, instansi, email )
VALUES
    ('1277777', 'dhika', 'ac43724f16e9241d990427ab7c8f4228', 'INSW', 'dhika@gmail.com'),
    ('13222', 'reza', 'ac43724f16e9241d990427ab7c8f4228', 'rindag', 'rez@gmail.com');