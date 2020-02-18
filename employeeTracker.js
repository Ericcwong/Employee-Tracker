const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    //Your Username
    user:"root",
    //Enter your password
    password: "password",
    database: "Employee_Tracker_DB"
});

connection.connect(function(err){
    if (err) throw err;
    startTracker();
});

function startTracker(){
    inquirer
    .prompt({
        name: "initial",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all Employee",
            "View all Employee by Department",
            "View all Employee by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee",
            "Updated Employee Role",
            "Update Employee Manager"
        ]
    }).then(function(choice){
        switch (choice.initial){
            case "View all Employee": 
                viewEmployee();
            break;

            case "View all Employee by Department":
                viewDepartment();
            break;

            case "View all Employee by Manager":
                viewManager();
            break;

            case "Add Employee":
                addEmployee();
            break;

            case "Remove Employee":
                removeEmployee();
            break;

            case "Update Employee":
                updateEmployee();
            break;

            case "Update Employee Role":
                updateEmployeeRole();
            break;

            case "Update Employee Manager":
                updateEmployeeManager();
            break;
        }
    });
}
function viewEmployee(){
    let query = "SELECT * ";
    query += "FROM Employee as EM INNER JOIN Role as RL ON EM.role_id = RL.role_id ";
    query += "INNER JOIN ";
    connection.query(query, function(err, res){
        for(let i = 0; i < res.length; i++){
            console.table([
                {
                    Employee_ID: res[i].employee_id,
                    First_Name: res[i].first_name,
                    Last_Name: res[i].last_name,
                    Role_ID: res[i].role_id,
                    Manager_ID: res[i].manager_id,
                    Title: res[i].title,
                    Salary: res[i].salary
                }
            ])
        }
        startTracker();
    });
}
