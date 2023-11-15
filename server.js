//dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo")

require("console.table");

require("dotenv").config();



const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'empTracker_db'
});
dbConnection.connect(function (err) {
    if (err) throw(err);
    console.log("Connected to empTracker_db Database.");
    appStart();
});

function appStart(){
    const someText = logo({ name: "Employee Rolodex \n"}).render();
    console.log(someText);
    inquirer
     .prompt([
        {
          type: "list",
          name: "openingMessage",
          message: "Please select from the following:",
          choices: [
            "viewAllEmployees",
            "viewAllDepeartments",
            "viewAllRoles",
            "addADeparment",
            "addARole",
            "addAEmployee",
            "updateEmployee",
            "quit",
          ],
        },
     ]).then((inquirerResponse) => {
        console.log("Selected User: " + inquirerResponse.openingMessage);
        let choices = inquirerResponse.openingMessage;
        switch (choices) {
            case "viewAllEmployees":
                viewAllEmployees();
                break;
            case "viewAllDepartments":
                viewAllDepartments();
                break;
            case "viewAllRoles":
                viewAllRoles();
                    break;
            case "addADeparment":
                addADeparment();
                break;
            case "addARole":
                addARole();
                break;
            case "addAEmployee":
                addAEmployee();
                break;    
            case "updateEmployee":
                updateEmployee();
                    break;
            case "quit":
                    quit();
                    break;
        }
     });
}


function viewAllEmployees() {
    const query = `SELECT * FROM empIdentity`; 
    dbConnection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        appStart();
    });
}
function viewAllDepartments() {
    const query = `SELECT * FROM empDepartment`;
    dbConnection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
        appStart();
    });
}
function viewAllRoles() {
    const query = `SELECT * FROM empRole`;
    dbConnection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEE ROLES');
        console.log('\n');
        console.table(res);
        appStart();
    });
}

function addADeparment() {
    inquirer
	.prompt({      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"
    }).then(function(answer){
        dbConnection.query("INSERT INTO empDepartment (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            appStart()
    })
    })
}

function addARole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the employee's role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "$alary?",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "What is the department ID number?",
          name: "deptID"
        }
      ])
      .then(function(answer) {
        dbConnection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
          if (err) throw err;
          console.table(res);
          appStart();
        });
      });
  }
  function addAEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "First Name?",
          name: "firstName"
        },
        {
          type: "input",
          message: "Last Name?",
          name: "lastName"
        },
        {
          type: "input",
          message: "Employee Role ID?",
          name: "roleID"
        },
        {
          type: "input",
          message: "Manager ID Number?",
          name: "managerID"
        }
      ]).then(function(answer) {
       dbConnection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          appStart();
        });
      });
  }