const inq = require('inquirer');

/**
 * Table class used to collect inputs from prompts and use controller to update databases
 * @param {DB} db: DB class controller instance used to connect and query mysql database
 */
class Table {
    constructor(db) {
        this.db = db;
    };

    async all(fields) {
        return await this.conn.tblAll(fields, this.constructor.name);
    }
}

class Department extends Table {
    constructor(db, id = null, name = null) {
        super(db);
        this.id = id;
        this.name = name;
    };

    // Prompt user for inputs and insert values into database
    add = async () => {
        let res = await inq.prompt([{
            type: "input",
            name: "name",
            message: "Enter the name of the new department:",
        }])

        await this.db.insert('department', res);
    }
};

class Role extends Table {
    constructor(db, id = null, title = null, salary = null, department_id = null) {
        super(db);
        this.id = id;
        this.title = title;
        this.salary = salary
        this.department = department_id;
    };

    // Prompt user for inputs and insert values into database
    async add() {
        // Get all deparments
        let departments = await this.db.tblAll(["id", "name"], "department",);

        let res = await inq.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the name of the new role:",
            },
            {
                type: "number",
                name: "salary",
                message: "Enter the salary:",
            },
            {
                type: "list",
                name: "department_id",
                message: "Select the department:",
                choices: departments.map(item => { return { value: item.id, name: item.name } })
            },
        ])

        await this.db.insert(this.constructor.name.toLowerCase(), res);
    }
};

class Employee extends Table {
    constructor(db, id = null, first_name = null, last_name = null) {
        super(db);
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
    };

    // Prompt user for inputs and insert values into database
    async add() {
        // Get all roles and managers 
        let roles = await this.db.tblAll(["id", "title"], "role",);
        let managers = await this.db.tblAll(["id", "first_name", "last_name"], "employee",);

        // Add no manager option 
        managers.unshift({ id: null, first_name: "*- None -*", last_name: "" })

        let res = await inq.prompt([
            {
                name: "first_name",
                type: "input",
                message: "Enter new employees first name:",
            },
            {
                name: "last_name",
                type: "input",
                message: "Enter new employees last name:",
            },
            {
                name: "role_id",
                type: "list",
                message: "Select the employee's role:",
                choices: roles.map(item => { return { value: item.id, name: item.title } })
            },
            {
                name: "manager_id",
                type: "list",
                message: "Enter employee's manager:",
                choices: managers.map(item => { return { value: item.id, name: `${item.first_name} ${item.last_name}` } })
            },
        ])

        await this.db.insert(this.constructor.name.toLowerCase(), res);
    }
};


module.exports = { Department, Role, Employee }