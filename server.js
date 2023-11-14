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
            case "viewAllDepeartments":
                viewAllDepeartments();
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
function viewAllDepeartments() {
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