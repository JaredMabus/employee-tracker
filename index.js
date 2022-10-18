const DB = require('./db/DB');


// Test DB Class connection
const init = async () => {
    const db = new DB('test')
    await db.connect();
    await db.query('SELECT * FROM products;');
    db.close();

    return;
}

init();