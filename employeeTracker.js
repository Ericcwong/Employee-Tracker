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
//Displays the employee cards
function viewEmployee(){
    //selects all, it is displaying in order by the console.table
    let query = "SELECT EM.employee_id, EM.first_name, EM.last_name, RL.title, DP.department_name, RL.salary, MG.manager_name ";
    query += "FROM Employee as EM LEFT JOIN Role as RL ON EM.role_id = RL.role_id ";
    query += "LEFT JOIN Department as DP ON RL.department_id = DP.department_id ";
    query += "LEFT JOIN Manager as MG ON EM.manager_id = MG.manager_id";
    connection.query(query, function(err, res){
        for(let i = 0; i < res.length; i++){
            console.table([
                {
                    Employee_ID: res[i].employee_id,
                    First_Name: res[i].first_name,
                    Last_Name: res[i].last_name,
                    Title: res[i].title,
                    Department: res[i].department_name,
                    Salary: res[i].salary,
                    //Manager id needs a manager table
                    Manager_ID: res[i].manager_name
                }
            ])
        }
        startTracker();
    });
}
//Viewing only the department
function viewDepartment(){
    let query = "SELECT * FROM Department"
    connection.query(query,function(err, res){

   //Displays the department options
        inquirer.prompt({
            name: "viewDep",
            type: "list",
            message: "Here are the departments",
            choices: function(){
                let departmentArray = [];
                for (let i = 0; i < res.length; i++){
                    departmentArray.push(res[i].department_name);
                }
                return departmentArray;
            }
        }).then(function(choices){
            console.log(choices);
        // With the option chosen, It should spit out the choice that was made
            let query = "SELECT EM.employee_id, EM.first_name, EM.last_name, RL.title, DP.department_name, RL.salary, EM.manager_id ";
            query += "FROM Employee as EM INNER JOIN Role as RL ON EM.role_id = RL.role_id ";
            query += "INNER JOIN Department as DP ON RL.department_id = DP.department_id ";
            query += "WHERE DP.department_name = ?"
            connection.query(query, [choices.viewDep], function(err, res){
                console.log(choices.viewDep);
                for(let i = 0; i < res.length; i++){
                    console.table([
                        {
                            Employee_ID: res[i].employee_id,
                            First_Name: res[i].first_name,
                            Last_Name: res[i].last_name,
                            Title: res[i].title,
                            Department: res[i].department_name,
                            Salary: res[i].salary,
                            //Manager id needs a manager table
                            Manager_ID: res[i].manager_id
                        }
                    ])
                }
                startTracker();
            });
        });
    });
}

