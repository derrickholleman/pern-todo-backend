psql -U postgres to login

\c to connect to postgres
\l to see list of databases

CREATE DATABASE pernstack;

\c pernstack to connect to database
\dt to see list of all tables

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);