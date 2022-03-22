const mysql = require('mysql2/promise');

const connect = async () => {
    // return the connection if it was already created
    if(global.connection && global.connection.state !== 'disconnected') 
        return global.connection;

    // create the connection
    const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;       
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_NAME,
        password: DB_PASSWORD
    });

    console.log('connection open');
    // set it to a global variable
    global.connection = connection;
    return connection;
};

module.exports = connect;
