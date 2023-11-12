//dependencies

const mysql = require("mysql");
const inquirer = require("inquirer");

require("dotenv").config();



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employeeTracker_db'
});