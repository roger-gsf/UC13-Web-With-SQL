CREATE DATABASE my_db;

USE my_db;

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255),
    user_password VARCHAR(255)
);