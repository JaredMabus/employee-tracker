
class DBTbl {
    constructor(conn) {
        this.conn = conn;
    };

    // async all(tbl, fields){
    //     return this.conn.tblAll(tbl, fields)
    // }
}

class Department extends DBTbl {
    constructor(id, name) {
        super(conn);
        this.id = id;
        this.name = name;

    };
};

class Role extends DBTbl {
    constructor(id, name, department_id) {
        super(conn);
        this.id = id;
        this.name = name;
        this.department = department_id;
    };
};

class Employee extends DBTbl {
    constructor(id, name) {
        super(conn);
        this.id = id;
        this.name = name;
    };
};


module.exports = { Department, Role, Employee }