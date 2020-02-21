const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  //Your Username
  user: "root",
  //Enter your password
  password: "password",
  database: "Employee_Tracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  startTracker();
});

function startTracker() {
  inquirer
    .prompt({
      name: "initial",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employee",
        "View all Employee by Department",
        "View all Employee by Manager",
        "View all Managers",
        "View all Departments",
        "View all Roles",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
      ]
    })
    .then(function(choice) {
      switch (choice.initial) {
        case "View all Employee":
          viewEmployee();
          break;

        case "View all Employee by Department":
          viewEmployeeDepartment();
          break;

        case "View all Employee by Manager":
          viewEmployeeManager();
          break;
        case "View all Managers":
          viewManager();
          break;

        case "View all Departments":
          viewDepartment();
          break;

        case "View all Roles":
          viewRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
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
function viewEmployee() {
  //selects all, it is displaying in order by the console.table
  let query =
    "SELECT EM.employee_id, EM.first_name, EM.last_name, RL.title, DP.department_name, RL.salary, MG.manager_name ";
  query +=
    "FROM Employee as EM LEFT JOIN Role as RL ON EM.role_id = RL.role_id ";
  query += "LEFT JOIN Department as DP ON RL.department_id = DP.department_id ";
  query += "LEFT JOIN Manager as MG ON EM.manager_id = MG.manager_id";
  connection.query(query, function(err, res) {
    console.table(res);
    startTracker();
  });
}
//Viewing Employees by Department
function viewEmployeeDepartment() {
  let query = "SELECT * FROM Department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    //Displays the department options
    inquirer
      .prompt({
        name: "viewDep",
        type: "list",
        message: "Here are the departments",
        choices: function() {
          let departmentArray = [];
          for (let i = 0; i < res.length; i++) {
            departmentArray.push(res[i].department_name);
          }
          return departmentArray;
        }
      })
      .then(function(choices) {
        console.log(choices);
        // With the option chosen, It should spit out the choice that was made
        let query =
          "SELECT EM.employee_id, EM.first_name, EM.last_name, RL.title, DP.department_name, RL.salary, EM.manager_id ";
        query +=
          "FROM Employee as EM INNER JOIN Role as RL ON EM.role_id = RL.role_id ";
        query +=
          "INNER JOIN Department as DP ON RL.department_id = DP.department_id ";
        query += "WHERE DP.department_name = ?";
        connection.query(query, [choices.viewDep], function(err, res) {
          console.log(choices.viewDep);
          console.table(res);
          startTracker();
        });
      });
  });
}
//Viewing employees by manager
function viewEmployeeManager() {
  //selects all, it is displaying in order by the console.table
  let query = "SELECT Manager.manager_id, Manager.manager_name FROM Manager";
  connection.query(query, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "viewMg",
        type: "list",
        message: "Here are the Managers",
        choices: function() {
          let managerArray = [];
          for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].manager_name);
          }
          return managerArray;
        }
      })
      .then(function(choices) {
        console.log(choices);
        // With the option chosen, It should spit out the choice that was made
        let query =
          "SELECT MG.manager_name, EM.employee_id, EM.first_name, EM.last_name, RL.title, DP.department_name, RL.salary ";
        query +=
          "FROM Employee as EM INNER JOIN Role as RL ON EM.role_id = RL.role_id ";
        query +=
          "INNER JOIN Department as DP ON RL.department_id = DP.department_id ";
        query += "INNER JOIN Manager as MG ON MG.manager_id = EM.manager_id ";
        query += "WHERE MG.manager_name = ?";
        connection.query(query, [choices.viewMg], function(err, res) {
          console.log(choices.viewMg);
          console.table(res);
          startTracker();
        });
      });
  });
}
//Views all Managers
function viewManager() {
  let query = "SELECT Manager.manager_id, Manager.manager_name FROM Manager";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startTracker();
  });
}
//Views all Departments
function viewDepartment() {
  let query =
    "SELECT Department.department_id, Department.department_name FROM Department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startTracker();
  });
}
//View roles
function viewRole() {
  let query = "SELECT Role.role_id, Role.title, Role.salary FROM Role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startTracker();
  });
}
//Adding employees
function addEmployee() {
  let query = "SELECT Role.title FROM Role ";
  let mgQuery = "SELECT Manager.manager_name FROM Manager";
  connection.query(query, function(err, res) {
    if (err) throw err;
    connection.query(mgQuery, function(mgErr, mgRes) {
      if (mgErr) throw err;
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is their First Name"
          },
          {
            name: "last_name",
            type: "input",
            message: "What is their Last Name?"
          },
          {
            name: "roles",
            type: "list",
            message: "What is their Role?",
            choices: function() {
              let roleArray = [];
              for (let i = 0; i < res.length; i++) {
                roleArray.push(res[i].title);
              }
              return roleArray;
            }
          },
          {
            name: "manager",
            type: "list",
            message: "Who is their Manager?",
            choices: function() {
              let managerArray = [];
              for (let i = 0; i < mgRes.length; i++) {
                managerArray.push(mgRes[i].manager_name || "Default");
              }
              return managerArray;
            }
          }
        ])
        .then(function(choices) {
          console.log(choices);
          // With the option chosen, It should spit out the choice that was made
          let emQuery = "INSERT INTO Employee SET ?";
          let rlQuery = "INSERT INTO Role SET ?";
          let mgQuery = "INSERT INTO Manager SET ?";
          connection.query(
            emQuery,
            { first_name: choices.first_name, last_name: choices.last_name },
            function(err) {
              connection.query(rlQuery, { title: choices.roles }, function(
                err
              ) {
                connection.query(
                  mgQuery,
                  { manager_name: choices.manager },
                  function(err, res) {
                    if (err) throw err;
                    console.log(choices.first_name);
                    console.log(choices.manager);
                    console.table(res);
                    startTracker();
                  }
                );
              });
            }
          );
        });
    });
  });
}
function removeEmployee() {
  let query = "SELECT CONCAT_WS(' ', first_name, last_name) AS fullname FROM Employee ";
  connection.query(query, function(err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which Employee do you want to remove?",
        choices: function() {
          let employeeArray = [];
          for (let i = 0; i < res.length; i++) {
            employeeArray.push(res[i].fullname);
          }
          return employeeArray;
        }
      })
      .then(function(choice) {
        console.log(choice.employee);
        let deleteQuery = "DELETE FROM Employee WHERE first_name = ?";
        connection.query(deleteQuery, [choice.employee], function(err) {
          if (err) throw err;
          console.log("Removed Employee.");
          startTracker();
        });
      });
  });
}
function updateEmployeeRole() {
  let employeeQuery = "SELECT * FROM Employee";
  let roleQuery = "SELECT * FROM Role";
  connection.query(employeeQuery, function(err, emRes) {
    if (err) throw err;
    connection.query(roleQuery, function(err, rlRes) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Choose the Employee you want to update.",
            choices: function() {
              let employeeArray = [];
              for (let i = 0; i < emRes.length; i++) {
                employeeArray.push(emRes[i].first_name);
              }
              return employeeArray;
            }
          },
          {
            name: "role",
            type: "list",
            message: "Choose the new Role.",
            choices: function() {
              let roleArray = [];
              for (let i = 0; i < rlRes.length; i++) {
                roleArray.push(rlRes[i].title);
              }
              return roleArray;
            }
          }
        ])
        .then(function(choice) {
          let updateQuery = "UPDATE Employee SET role_id ? WHERE first_name ? ";
          updateQuery += "INNER JOIN Role ON Employee.role_id = Role.role_id";
          connection.query(
            updateQuery,
            [choice.role, choice.employee],
            function(err) {
              if (err) throw err;
            }
          );
          
        });
    });
  });
}
