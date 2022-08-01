// packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const Choice = require("inquirer/lib/objects/choice");
const db = require("./db/connection");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});

const questions = [];
const promptQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "initial_prompt",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please choose what you would like to do");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const { initial_prompt } = answers;
      if (initial_prompt === `view all roles`) {
        viewRoles();
      } else if (initial_prompt === `view all departments`) {
        viewDepartment();
      } else if (initial_prompt === `view all employees`) {
        viewEmployee();
      } else if (initial_prompt === `add a department`) {
        addDepartment();
      } else if (initial_prompt === `add a role`) {
        createRole();
      } else if (initial_prompt === `add an employee`) {
        addEmp();
      } else if (initial_prompt === `update an employee role`) {
        updateEmp();
      }
    });
};

// view all roles
function viewRoles() {
  const sql2 = `SELECT role.title, role.salary, department.dep_name as department FROM role LEFT JOIN department on role.department_id = department.id`
  db.query(sql2, (err, rows) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.table(rows);
    promptQuestions();
  });
}

// Create a role
function createRole() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "what is the salary?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a salary");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department ID?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a department ID");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO role (title, salary, department_id)
          VALUES (?,?,?)`;
      const params = [answers.title, answers.salary, answers.department_id];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log("error", err);
          return;
        }
        console.log("new role created!");
        viewRoles();
        promptQuestions();
      });
    });
}

// view all departments
function viewDepartment() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.table(rows);
    promptQuestions();
  });
}

// add a department
function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the Department name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a name");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO department (dep_name)
          VALUES (?)`;
      const params = [answers.department];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log("error", err);
          return;
        }
        console.log("new department created!");
        viewDepartment();
        promptQuestions();
      });
    });
}

// view all employees
function viewEmployee() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.table(rows);
    promptQuestions();
  });
}

// add a employee
function addEmp() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "enter first name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "enter last name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a last name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "role_id",
        message: "enter role id",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have role_id");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "manager_id",
        message: "enter manager id",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must have a manager id");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?,?,?,?)`;
      const params = [
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id,
      ];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log("error", err);
          return;
        }
        console.log("new employee!");
        viewEmployee();
        promptQuestions();
      });
    });
}

// update employee role
function updateEmp() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "emp_id",
        message: "enter employee id",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must enter employee id");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "role_update",
        message: "enter role update",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("you must update Role");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const sql = `UPDATE employee SET role_id = ? 
    WHERE id = ?`;
      const params = [answers.role_update, answers.emp_id];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log("error", err);
          return;
          // check if a record was found
        } else if (!result.affectedRows) {
          console.log(`employee not found`);
          return;
        } else {
          console.log(`updated employee successfully`);
        }
        viewEmployee();
        promptQuestions();
      });
    });
}

promptQuestions();
