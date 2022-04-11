const connect = require('./connect');
const logger = require('../utils/logger');

const save = async (user) => {
    // connecting to db
    const conn = await connect();
    
    // preparing query
    const query  = 'INSERT INTO users(name, username, email, password) VALUES (?,?,?,?);';
    const values = [
        user.name,
        user.username,
        user.email,
        user.password
    ];

    //executing query
    const res = await conn.query(query, values);
        
    return res;
};

const findByUsername = async (username) => {
    // connecting to db
    const conn = await connect();
    
    // preparing query
    const query  = 'SELECT id, username, password FROM users WHERE username = ?;';
    const values = [
        username,            
    ];

        //executing query and retorning user
    const [result] = await conn.query(query, values);
    return result;
};

module.exports = {
    save,
    findByUsername
};