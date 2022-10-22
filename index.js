const DB = require('./db');
const { Department, Role, Employee } = require('./lib/Table');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');

// Initialize app
const init = async () => {
  try {
    console.log(logo(config).render());
    const db = new DB();
    await db.connect();
    await loadMainPrompts(db);
    return;

  } catch (err) {
    console.log(err)
  }
}

// Here we load the initial prompts with a series of options. The first option is provided for you.
const loadMainPrompts = async (db) => {
  const dpt = new Department(db);
  const role = new Role(db);
  const employee = new Employee(db);

  const res = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add New Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add New Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add New Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee",
          value: "UPDATE_EMPLOYEE"
        },
        {
          name: "Quit",
          value: "QUIT"
        },
      ]
    }
  ])

  switch (res.choice) {
    case "VIEW_DEPARTMENTS":
      await dpt.all();
      break;
    case "VIEW_ROLES":
      await role.all();
      break;
    case "VIEW_EMPLOYEES":
      await employee.all();
      break;
    case "ADD_DEPARTMENT":
      await dpt.add();
      break;
    case "ADD_ROLE":
      await role.add()
      break;
    case "ADD_EMPLOYEE":
      await employee.add();
      break;
    case "UPDATE_EMPLOYEE":
      await employee.update();
      break;
    case "QUIT":
      process.exit();
    default:
      console.log("No Valid Choice Made");
  }

  loadMainPrompts(db);
}

init();