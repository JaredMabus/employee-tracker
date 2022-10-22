const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Database controller class
 * @param {func} conn: mysql.createConnection object
 */
class DB {
    constructor() {
        this.conn = null;
    };

    // Connect to db
    async connect() {
        this.conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        });
        if (this.conn.errorEmitted) {
            console.log("Could not connect to Database")
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
        Array.isArray(data) ? "" : data = new Array(data);

        // data.keys are used as the field names
        let fields = Object.keys(data[0]);

        // Array of nested arrays for insert query
        data = data.map(item => {
            return Object.values(item);
        })

        // Execute query 
        await this.conn.query(`INSERT INTO ??(??) VALUES ? `, [tblName, fields, data]);
        console.log(`\nSuccessfully added to '${tblName}' table!\n`);
    };

    async update(tblName, id, data) {
        await this.conn.query(`UPDATE ${mysql.escapeId(tblName)} SET ? WHERE id = ${mysql.escape(id)}`, data);
    };

    // View roles
    async allRoles() {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let sql = `SELECT r.id, r.title AS role_itle, r.salary, dt.name AS department
        FROM role r
        INNER JOIN department dt ON r.department_id = dt.id
        ;`;

        let [records, fields] = await this.conn.query(sql);
        return records;
    }

    // Select all Employees method
    async allEmployees() {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let sql = `SELECT e.id, e.first_name, e.last_name, r.title AS role_itle, r.salary, dt.name AS department, CONCAT(em.first_name," ", em.last_name) AS manager
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department dt ON r.department_id = dt.id
        LEFT JOIN employee em ON em.id = e.manager_id
        ;`

        let [records, fields] = await this.conn.query(sql);
        return records;
    };

    // Close the db connection
    close() {
        this.conn.close();
        console.log("Closed DB connection");
    };
}

module.exports = DB;