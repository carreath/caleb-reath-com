-- mysql -p "database_name" < db_create.sql

create table UserAccount(
    email varchar(100) primary key,
    hashed_password varchar(256) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    is_admin boolean default false,
    last_login timestamp
);

create table Application(
    id int auto_increment primary key,
    email varchar(100) references UserAccount,
    name varchar(100) not null,
    description text not null,
    creation_time timestamp not null,
    api_key int(36) unique,
    app_state ENUM('Pending', 'Approved', 'Rejected') default 'Pending',
    is_valid boolean default false,
    rejection_reason text
);

create table APILog(
    id int auto_increment primary key,
    application_id int references Application(id),
    url text not null,
    status_code int not null,
    request_type enum('POST', 'GET', 'DELETE', 'PUT') not null
);

create table UNBSession(
    api_key int(36) references Application(api_key),
    unb_session_token varchar(50) not null,
    app_session_token int not null,
    
    primary key(api_key, unb_session_token, app_session_token)
);
