const DB = require('./db');
const { Department, Role, Employee } = require('./lib/Table');
const inquirer = require('inquirer');

// Test DB Class connection
const init = async () => {
    const db = new DB('business_db')

    // Connect to database
    await db.connect();

    // Test SELECT queries
    // await db.tblAll(["id", "name"], "department")
    // await db.allRoles();
    // await db.allEmployees();

    // Test INSERT queries
    await db.insert("department", [{ name: "Test" }, { name: "New test" }])


    db.close();
    return;
}


// Here we load the initial prompts with a series of options. The first option is provided for you.
// function loadMainPrompts() {
//     prompt([
//         {
//             type: "list",
//             name: "choice",
//             message: "What would you like to do?",
//             choices: [
//                 {
//                     name: "View All Employees",
//                     value: "VIEW_EMPLOYEES"
//                 },

//                 // add more options here
//             ]
//         }
//     ]).then(res => {
//         let choice = res.choice;
//         // Call the appropriate function depending on what the user chose

//         switch (choice) {
//             case "VIEW_EMPLOYEES":
//                 viewEmployees();
//                 break;

//             // add the other case statements here
//         }
//     }
//     )
// }

/* ======= Controllers ============================================================ */

// Here is a function which handles the first prompt option:  View all employees
// function viewEmployees() {

//     // Here we call the method in the db file for finding all employees.
//     // we get the result back, and then display the result 
//     db.findAllEmployees()
//         .then(([rows]) => {
//             let employees = rows;
//             console.log("\n");
//             console.table(employees);
//         })
//         .then(() => loadMainPrompts());
// }


/* ======= END Controllers ============================================================ */

/* 
  You will write lots of other functions here for the other prompt options.
  Note that some prompts will require you to provide more prompts, and these 
  may need functions of their own.
*/



// Everything starts here!
init();