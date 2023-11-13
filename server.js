//dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

require("console.table");

require("dotenv").config();



const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'empTracker_db'
},
console.log("Connected to empTracker_db Database.")
);

function appStart(){
    const someText = logo({ name: "Employee Roledex \n"}).render();
    console.log(someText);
    inquirer
     .prompt([
        {
          type: "list",
          name: "openingMessage",
          message: "Please select from the following:",
          selections: [
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
     ])
     .then((inquirerResponse) => {
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
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        appStart();
    });
}
