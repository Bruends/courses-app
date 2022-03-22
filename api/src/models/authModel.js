const connect = require('./connect');

const save = async (user) => {
    try {
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
        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw 'Error on saving the new user';
    }
};

const findByUsername = async (username) => {
    try {
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

    } catch (error) {
        console.log(error);
        throw 'Error on saving the new user';
    }
};

module.exports = {
    save,
    findByUsername
};