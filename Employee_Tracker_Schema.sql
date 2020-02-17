DROP DATABASE IF EXISTS Employee_Tracker_DB;

CREATE DATABASE Employee_Tracker_DB;
USE Employee_Tracker_DB;

CREATE TABLE Department(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE Role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE Employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    mangager_id INT,
    PRIMARY KEY(id)
);
SELECT * FROM Department;
SELECT * FROM ROLE;
SELECT * FROM Employee;