use thesis;

-- create table for user with id, name, email, password, department, and role
create table if not exists user (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    department varchar(255) not null,
    role varchar(255) not null
);