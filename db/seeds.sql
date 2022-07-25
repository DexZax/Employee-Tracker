INSERT INTO department (dep_name)
VALUES
('sales'),
('marketing'),
('accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('sales representative', '55000.00', 1),
('marketing team member', '55000.00', 2),
('accounting team member', '60000.00', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('jessica', 'fisher', 1, 1),
('james', 'harper', 1, 0),
('lebron', 'tames', 2, 1),
('kevin', 'leplant', 2, 0),
('steph', 'blurry', 3, 1),
('scottie', 'darns', 3, 0);
