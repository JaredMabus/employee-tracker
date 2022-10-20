const mysql = require('mysql2/promise');
require('console.table');
require('dotenv').config();

/**
 * Database controller class
 * @param {func} conn: mysql.createConnection object
 * @param {string} database: database to connect to
 */
class DB {
    constructor(database = null) {
        this.conn = null;
        this.database = database;
    };

    // Connect to db
    async connect() {
        this.conn = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MYSQL_USER,
            password: process.env.PASSWORD,
            database: this.database
        });
        if (this.conn.errorEmitted) {
            console.log("Could not connect to Database")
        } else {
            console.log("DB connected to successfully!\n")
        }
    };

    /**
     * Select all records from a table
     * @param {Array} columns: array of column names to incluse in the results
     * @param {String} tblName: name of table
     * @returns records: all the records in the table
     */
    async tblAll(columns, tblName,) {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };
        let [records, fields] = await this.conn.query(`SELECT ?? FROM ??;`, [columns, tblName]);
        // console.table(records);
        return records;
    };

    /**
     * Insert values into table
     * @param {String} tblName: name of table
     * @param {Array of objects} data: array of objects to be inserted into a table
     */
    async insert(tblName, data) {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        // Store objects in array to allow for adding multiple objects
        var data = new Array(data);

        // data.keys are used as the field names
        let fields = Object.keys(data[0]);

        // Array of nested arrays for insert query
        data = data.map(item => {
            return Object.values(item);
        })

        // Execute query 
        await this.conn.query(`INSERT INTO ??(??) VALUES ? `, [tblName, fields, data]);

        console.log(`Data successfully added to '${tblName}' table!\n`);
    };

    // View roles
    async allRoles() {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let sql = `SELECT r.id, r.title AS role_itle, r.salary, dt.name AS department_name
        FROM role r
        INNER JOIN department dt ON r.department_id = dt.id
        ;`

        let [records, fields] = await this.conn.query(sql);

        console.table(records)
        return records;
    }

    // Select all Employees method
    async allEmployees() {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let sql = `SELECT e.id, e.first_name, e.last_name, r.title AS role_itle, r.salary, dt.name AS department_name, CONCAT(em.first_name," ", em.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department dt ON r.department_id = dt.id
        LEFT JOIN employee em ON e.id = em.manager_id
        ;`

        let [records, fields] = await this.conn.query(sql);

        console.table(records);
        return records;
    }

    // Close the db connection
    close() {
        this.conn.close();
        console.log("Closed DB connection");
    };
}

module.exports = DB;