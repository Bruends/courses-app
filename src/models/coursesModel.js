const connect = require('./connect');
const logger = require('../utils/logger');

// field string for selects
const courseFields = `
    courses.id, courses.user_id, courses.name, courses.link, 
    categories.name AS category, courses.category_id 
`;

const getAll = async (userId) => {
    try {
        // connect to db
        const conn = await connect();
        // preparing query
        const query =`
            SELECT ${courseFields}
            FROM courses
            JOIN categories
            ON courses.category_id = categories.id
            WHERE courses.user_id = ?
        `;
        // exetute query and return courses
        const [result] = await conn.query(query, [userId]);
        return result;
    
    } catch (error) {
        logger.error(error);
        throw 'Error on getting courses';
    }
};

const getById = async (id, userId) => {
    try {
        // connect to db
        const conn = await connect();

        //preparing query
        const query = `
            SELECT ${courseFields}
            FROM courses
            JOIN categories
            ON courses.category_id = categories.id
            WHERE courses.id = ? AND courses.user_id = ?
        `;

        // executing and returning the result
        const [result] = await conn.query(query, [
            id,
            userId
        ]);
        return result;
    
    }   catch (error) {
        logger.error(error);
        throw 'Error on getting course';
    }
};

const save = async (course) => {
    try {
        // connect to db
        const conn = await connect();
        
       // preparing query
        const query  = `INSERT INTO courses(user_id, name, link, category_id) 
                        VALUES (?,?,?,?)`;
        const values = [
            course.userId,
            course.name,
            course.link || null,
            course.categoryId || 1,            
        ];

        return await conn.query(query, values);
    
    } catch (error) {
        logger.error(error);
        throw 'Error on saving course';
    }
};

const update = async (course) => {
    try {
        // connect to db
        const conn = await connect();
        
        // preparing query
        const query  = `UPDATE courses SET name = ?, link = ?, category_id = ? WHERE id = ? AND user_id = ?`;
        const values = [
            course.name,
            course.link || null,
            course.categoryId || 1,            
            course.id,
            course.userId,
        ];
        
        // execute query
        return await conn.query(query, values);
    
    } catch (error) {
        logger.error(error);
        throw 'Error on saving course';
    }
};

const remove = async (id, user_id) => {
    try {
        // connect to db
        const conn = await connect();
        
        // preparing query
        const query = 'DELETE FROM courses WHERE id = ? AND user_id = ?';
        const [ result ] = await conn.query(query, [
            id,
            user_id
        ]);
        return result;

    }  catch (error) {
        logger.error(error);
        throw 'Error on deleting course';
    }
};


module.exports = {
    getAll,
    getById,
    update,
    save,
    remove,
};