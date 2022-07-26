// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const Choice = require('inquirer/lib/objects/choice');
const db = require('./db/connection');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    });

const questions = [];
const promptQuestions = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'initial_prompt',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('your README must have a title. Please enter a title!');
                  return false;
                }
              }
        }
    ]).then((answers) => {
      //big if statement that handles answers
      // if (view all roles) {
      // viewRoles()
      //}
      //and so on...
    })
};

// view all roles
function viewRoles () {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.table(rows);
  });
};

// Create a role
function createRole (){
  return inquirer.prompt ([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title?',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('you must have a title');
              return false;
            }
          }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'what is the salary?',
      validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('you must have a salary');
            return false;
          }
        }
  },
  {
    type: 'input',
    name: 'department_id',
    message: 'What is the department ID?',
    validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('you must have a department ID');
          return false;
        }
      }
},
]). then ((answers) => {
  //console.log(answers)
  // {
  //   title: whatever,
  //   salary: they,
  //   department_id: wrote
  // }
  const sql = `INSERT INTO role (title, salary, department_id)
          VALUES (?,?,?)`;
  const params = [answers.title, answers.salary, answers.department_id]
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("error", err);
        return;
      }
      console.log("new role created!")
      promptQuestions();
    });
})

promptQuestions()