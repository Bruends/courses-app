const connect = require('./connect');

const save = async (user) => {
    try {
        const conn = await connect();
    
        // preparing query
        const query  = 'INSERT INTO users(name, username, email, password) VALUES (?,?,?,?);';
        const values = [
            user.name,
            user.username,
            user.email,
            user.password
        ]

        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw "Error on saving the new user";
    }
}

module.exports = {
    save
}