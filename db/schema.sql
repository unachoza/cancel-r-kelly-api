DROP DATABASE cancel;
CREATE DATABASE cancel;
\c cancel;

CREATE TABLE songs(
id SERIAL PRIMARY KEY,
name text NOT NULL,
artist text NOT NULL,
deleted BOOLEAN 
);

CREATE TABLE users(
id SERIAL PRIMARY KEY,
display_name text NOT NULL,
email text NOT NULL,
country text NOT NULL,
time text,
songs INT REFERENCES songs(id)
);



