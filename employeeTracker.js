const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8000,
    //Your Username
    user:"root",
    //Enter your password
    password: "password",
    database: "Employee_Tracker_DB"
});

connection.connect(function(err){
    if (err) throw err;
    
});