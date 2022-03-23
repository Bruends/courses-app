const connect = require('./connect.js');

const save = async (name, userId) => {
    try {
        // connecting to db
        const conn = await connect();
    
        // preparing query
        const query  = 'INSERT INTO categories(name, user_id) VALUES (?,?)';
        const values = [
            name,
            userId,
        ];

        //executing query
        const [result] = await conn.query(query, values);
        return result;
    
    } catch (error) {
        console.log(error);
        throw 'Error on saving the new user';
    }
};

const getCategories = async (userId) => {
    try {
        // connecting to db
        const conn = await connect();
    
        // preparing query
        const query  = 'SELECT id, name, user_id FROM categories WHERE user_id = ?';
        const values = [
            userId,
        ];

        //executing query
        const [categories] = await conn.query(query, values);
        return categories;

    } catch (error) {
        console.log(error);
        throw 'Error on saving the new user';
    }
};

const getCategoryId = async (name, userId) => {
    try {
        // connecting to db
        const conn = await connect();
    
        // preparing query
        const query  = 'SELECT id FROM categories WHERE name = ? AND user_id = ?';
        const values = [
            name,
            userId,
        ];

        //executing query
        const [category] = await conn.query(query, values);
        return category;

    } catch (error) {
        console.log(error);
        throw 'Error on saving the new user';
    }
};


module.exports = {
    save,
    getCategories,
    getCategoryId
};