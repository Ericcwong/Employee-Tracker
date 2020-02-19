DROP DATABASE IF EXISTS Employee_Tracker_DB;

CREATE DATABASE Employee_Tracker_DB;
USE Employee_Tracker_DB;

CREATE TABLE Department(
	department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
)ENGINE=INNODB;

CREATE TABLE Role(
	role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL
)ENGINE=INNODB;

CREATE TABLE Manager(
	manager_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    manager_name VARCHAR(30)
)ENGINE=INNODB;

CREATE TABLE Employee(
	employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
)ENGINE=INNODB;

-- Creating Departments
INSERT INTO Department(department_name)
VALUES("Sales"),("Engineering"),("Finance"),("Legal");

-- Creating Roles
INSERT INTO Role(title, salary, department_id)
VALUES("Sales Lead", 100000,1),("Sales Person", 65000,2),("Lead Engineer", 120000,3),("Manager Engineer", 110000,4);

-- Creating Managers

INSERT INTO Manager(manager_name)
VALUES("Caleb Trinh"),("Denise Tam"),("Kai Zheng"),("Calvin Kim");

-- Creating employees
INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES("Eric","Wong",1, NULL),("Elizabeth","Osenbach",2, 1),("Eva","Trinh",3, 2),("Tony","Trinh",4,3);