drop database if exists tododb;
create database tododb;
use tododb;

create table todo(
    todo_id integer auto_increment not null primary key,
    date_added DATETIME NOT NULL,
    todo_text TEXT NOT NULL
);

drop user if exists 'adrian'@'localhost';
create user 'adrian'@'localhost' identified by 'tN5LKSaK';

grant all privileges on tododb.* to 'adrian'@'localhost';