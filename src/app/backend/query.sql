use thesis;

-- create table for account with primary key of school_id, name, email, password, department, image as string, research_list as JSON and role
create table if not exists account (
    school_id varchar(255) not null,
    name varchar(50) not null,
    email varchar(50) not null,
    password varchar(50) not null,
    department varchar(50) not null,
    image varchar(255) not null,
    research_list JSON not null,
    role varchar(10) not null,
    primary key (school_id)
);

-- create a table for pending_user with email, school_id, role, and approve with school_id as primary key
create table if not exists pending_user (
    email varchar(50) not null,
    school_id varchar(50) not null,
    role varchar(10) not null,
    approve boolean not null,
    primary key (school_id)
);

-- create a table for research with id as primary_key, category as JSON, date_published, adviser, authors as JSON, title, abstract, keywords as JSON, department as JSON, qr
create table if not exists research (
    id int not null,
    category JSON not null,
    date_published varchar(50) not null,
    adviser varchar(50) not null,
    authors JSON not null,
    title varchar(255) not null,
    abstract varchar(255) not null,
    keywords JSON not null,
    department varchar(50) not null,
    qr varchar(255) not null,
    number_of_views int not null,
    primary key (id)
);
