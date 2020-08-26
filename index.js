const {prompt} = require('inquirer')
const mysql = require('mysql2')
require('console.table')

const db = mysql.createConnection('mysql://root:rootroot@localhost/employee_db')

const mainMenu = () => {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option',
            choices: [
                {
                    name: 'View Employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'Add an Employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update an Employee',
                    value: 'updateEmployee'
                },
                {
                    name: 'View Departments',
                    value: 'viewDepartments'
                },
                {
                    name: 'Add a Department',
                    value: "addDepartment"
                },

                {
                    name: 'View Roles',
                    value: 'viewRoles'
                },
                {
                    name: 'Add a Role',
                    value: 'addRole'
                }
            ]
        }
    ])
        .then(({ choice }) => {
            switch (choice) {
                case 'viewEmployees':
                    viewEmployees()
                    break
                case 'addEmployee':
                    addEmployee()
                    break
                case 'updateEmployee':
                    updateEmployee()
                    break
                case 'viewDepartments':
                    viewDepartments()
                    break
                case 'addDepartment':
                    addDepartment()
                    break
                case 'viewRoles':
                    viewRoles()
                    break
                case 'addRoles':
                    addRoles()
                    break
            }
        })

        .catch(err => console.log(err))
}

const viewEmployees = () => {
    db.query(`
    SELECT employee.id, employee.first_name, employee.last_name,
      role.title, role.salary, department.name AS department,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id
  `, (err, employees) => {
        if (err) { console.log(err) }
        console.table(employees)
        mainMenu()
    })
}

const addEmployee = () => {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) { console.log(err) }

        roles = roles.map(role => ({
            name: role.title,
            value: role.id
        }))

        db.query('SELECT * FROM employee', (err, employees) => {

            employees = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))

            employees.unshift({ name: 'None', value: null })

            prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee last name?'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose a role for the employee:',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Choose a manager for the employee:',
                    choices: employees
                }
            ])
                .then(employee => {
                    db.query('INSERT INTO employee SET ?', employee, (err) => {
                        if (err) { console.log(err) }
                        console.log('Employee Created!')
                        mainMenu()
                    })
                })
                .catch(err => console.log(err))
        })
    })
}
// Update employee role function
const updateEmployee = () => {
    db.query('SELECT * FROM employee', (err, employees) => {
        employees = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))
        db.query('SELECT * FROM role', (err, roles) => {
            roles = roles.map(role => ({
                name: role.title,
                value: role.id
            }))
            // Prompts for choosing which employee you would like to update, and for what the new role of the employee will be
            prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Which employee would you like to update?',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What will be the new role of the employee?',
                    choices: roles
                },
            ])
                .then(employee => {
                    console.log(employee.role_id)
                    db.query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [employee.role_id, employee.employee_id], (err) => {
                        if (err) { console.log(err) }
                        console.log('Employee has been updated')
                        mainMenu()
                    })
                })
                .catch(err => { console.log(err) })
        })
    })
}



        const viewDepartments = () => {
        db.query ('SELECT * FROM departments',(err, departments)=> {
            if (err) { console.log (err)}
            console.table(departments)
            mainMenu()
        })
        }

        // const addDepartment = () => {
        //     db.query('SELECT * FROM departments', (err, departments) => {
        //         if (err) { console.log(err) }

        //         departments = departments.map(department => ({
        //             name: department.name,
        //             value: department.id
        //         }))
        // }

const addDepartment = () => {
    prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    })
        .then(department => {
            db.query('INSERT INTO departments SET ?', department, (err) => {
                if (err) { console.log(err) }
                console.log('Department Created!')
                mainMenu()
            })
        })

}

        const viewRoles = () => {
            db.query('SELECT * FROM role', (err, role) => {
                if (err) { console.log(err) }
                console.table(role)
                mainMenu()
            })
        }


const addRole = () => {
    db.query('SELECT * FROM departments', (err, department) => {
        if (err) { console.log(err) }

        department = departments.map(department => ({
            name: department.name,
            value: department.id
        }))

        db.query('SELECT * FROM role', (err, role) => {

            role = role.map(role => ({
                name: `${role.title} ${role.salary}`,
                value: role.id
            }))

            role.unshift({ name: 'None', value: null })

            prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for the role?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'choose a department:',
                    choices: departments
                }
            ])
                .then(role => {
                    db.query('INSERT INTO role SET ?', role, (err) => {
                        if (err) { console.log(err) }
                        console.log('Role Created!')
                        mainMenu()
                    })
                })
                .catch(err => console.log(err))
        })
    })
}

        

        mainMenu()