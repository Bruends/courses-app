const connect = require('./connect.js');
const logger = require('../utils/logger');

const save = async (name) => {
    try {
        // connecting to db
        const conn = await connect();
    
        // preparing query
        const query  = 'INSERT INTO categories(name) VALUES (?)';
        const values = [
            name,
        ];

        //executing query
        const [result] = await conn.query(query, values);
        return result;
    
    } catch (error) {
        logger.error(error);
        throw 'Error on saving category';
    }
};

const getCategories = async (userId) => {
    try {
        // connecting to db
        const conn = await connect();
    
        // preparing query
        // get only the categories that the user 
        // already used
        const query  = `
            SELECT DISTINCT categories.id, categories.name 
            FROM categories
            JOIN courses
            ON courses.category_id = categories.id
            WHERE courses.user_id = ?;
        `;

        const values = [
            userId,
        ];

        //executing query
        const [categories] = await conn.query(query, values);
        return categories;

    } catch (error) {
        logger.error(error);
        throw 'Error on getting categories';
    }
};

const getCategoryId = async (name) => {
    try {
        // connecting to db
        const conn = await connect();
    
        // preparing query
        const query  = 'SELECT id FROM categories WHERE name = ?';
        const values = [
            name,            
        ];

        //executing query
        const [category] = await conn.query(query, values);
        return category;

    } catch (error) {
        logger.error(error);
        throw 'Error on saving the new user';
    }
};

module.exports = {
    save,
    getCategories,
    getCategoryId,
};