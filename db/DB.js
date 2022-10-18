const mysql = require('mysql2/promise');
const ct = require('console.table');

require('dotenv').config();

class DB {
    constructor(database = null) {
        this.conn = null;
        this.database = database;
    }

    async connect() {
        this.conn = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MYSQL_USER,
            password: process.env.PASSWORD,
            database: this.database
        });
        if (this.conn.errerEmitted) {
            console.log(this.conn)
        } else {
            console.log("DB connected to successfully!\n")
        }
    }

    async query(queryString) {
        if (this.conn === null) {
            console.log("Not Connected to DB");
        };

        let [records, fields] = await this.conn.query(queryString);
        // let results = await this.conn.query({ sql: queryString, rowsAsArray: true });
        console.table(records);

    }

    async seed() {
        if (this.db === null) {
            console.log("Not Connected to DB");
        };

        let seedSQL = ``;

        this.db.query();
    }

    async close() {
        this.conn.close();
        console.log("Closed DB connection")
    }
}

module.exports = DB;