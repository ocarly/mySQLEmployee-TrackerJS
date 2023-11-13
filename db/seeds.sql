USE employeeTracker_db;

-- empDepartment
INSERT INTO empDepartment (name)
VALUES ('Marketing'),
       ('Research and Development'),
       ('Human Resources'), ('IT');

-- empRole
INSERT INTO empRole (title, salary, department_id)
VALUES ('Marketing Manager', 110000, 1),
       ('Research Scientist', 95000, 2),
       ('HR Specialist', 130000, 3),
       ('Systems Analyst', 105000, 4),
       ('Financial Analyst', 135000, 3),
       ('Legal Advisor', 220000, 4),
       ('Paralegal', 180000, 4);

-- empIdentity
INSERT INTO empIdentity (first_name, last_name, role_id, manager_id) 
VALUES ('Emily', 'Johnson', 1, null),
       ('Michael', 'Davis', 3, null),
       ('Sarah', 'Williams', 4, 2),
       ('Ryan', 'Smith', 6, null),
       ('Jessica', 'Miller', 2, 1),
       ('David', 'Thompson', 2, 1);
