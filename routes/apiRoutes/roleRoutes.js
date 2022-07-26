const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

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
  const sql = `INSERT INTO role (title, salary, department_id)
          VALUES (?,?,?)`;
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("error", err);
        return;
      }
      console.log("new role created!")
      // callback function prompt questions
    });
    return;

})


module.exports = createRole;
