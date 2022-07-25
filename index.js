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
            name: 'initial prompt',
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
    ])
};

promptQuestions()