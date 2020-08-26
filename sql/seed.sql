USE employee_db;

INSERT INTO departments (name)
VALUES ('HR'), ('FINANCE'), ('CUSTOMER SERVICES'), ('SALES');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Rep', 60000, 4),
  ('Sales Manager', 100000, 4),
  ('Finance Rep', 60000, 2),
  ('Finance Manager', 100000, 2),
  ('Customer Service Rep', 50000, 3),
  ('Customer Service Manager', 80000,3),
  ('HR Rep', 55000, 1),
  ('HR Manager', 110000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Jordan', 3, NULL),
  ('Michael', 'Jackson', 4, NULL),
    ('Michael', 'Phelps', 5, NULL),
    ('Michael', 'Myers', 7, NULL),
  ('Michael', 'Vick', 1, 1),

  ('Michael', 'Ealy', 2,2),

  ('Michael', 'Tyson', 6, 3),
  
  ('Michael', 'Fox', 8, 4);


