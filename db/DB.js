const mysql = require('mysql2/promise');
const ct = require('console.table');

require('dotenv').config();

class DB {
    constructor(database = null) {
        this.conn = null;
        this.database = database;
    }

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
    }

    // Query method
    async query(queryString) {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let [records, fields] = await this.conn.query(queryString);
        // let results = await this.conn.query({ sql: queryString, rowsAsArray: true });
        console.table(records);

    }

    // Create seed method
    async seed() {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let seedSQL = ``;

        this.db.query();
    }

    // Close the db connection
    close() {
        this.conn.close();
        console.log("Closed DB connection")
    }
}

module.exports = DB;