DROP DATABASE IF EXISTS empTracker_db;
CREATE DATABASE empTracker_db;
USE empTracker_db;

CREATE TABLE empDepartment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NULL
);

CREATE TABLE empRole (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10.3) NULL,
  department_id INT NULL,
  FOREIGN KEY (department_id) REFERENCES empDepartment(id),
  PRIMARY KEY (id)
);

CREATE TABLE empIdentity(
    id INT auto_increment PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL
);