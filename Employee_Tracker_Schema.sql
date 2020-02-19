DROP DATABASE IF EXISTS Employee_Tracker_DB;

CREATE DATABASE Employee_Tracker_DB;
USE Employee_Tracker_DB;

CREATE TABLE Department(
	department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)ENGINE=INNODB;
CREATE TABLE Role(
	role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL
)ENGINE=INNODB;
CREATE TABLE Employee(
	employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
)ENGINE=INNODB;

-- Creating Departments
INSERT INTO Department(name)
VALUES("Sales");
INSERT INTO Department(name)
VALUES("Engineering");
INSERT INTO Department(name)
VALUES("Finance");
INSERT INTO Department(name)
VALUES("Legal");


-- Creating Roles
INSERT INTO Role(title, salary, department_id)
VALUES("Sales Lead", 100000,1),("Sales Person", 65000,2),("Lead Engineer", 120000,3),("Manager Engineer", 110000,4);


-- Creating employees
INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES("Eric","Wong",1, NULL),("Elizabeth","Osenbach",2, 1),("Eva","Trinh",3, 2),("Tony","Trinh",4,3);