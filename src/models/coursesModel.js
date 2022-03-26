const connect = require('./connect');
const logger = require('../utils/logger');

// field string for selects
const courseFields = `
    courses.id, courses.user_id, courses.name, courses.link, 
    categories.name AS category, courses.category_id, courses.notes, 
    courses.completed, courses.last_updated, courses.certificate_link, 
    courses.total_lessons, courses.completed_lessons 
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
        
        // query fields
        const insertCourseFields = `user_id, name, link, category_id, notes, 
            completed, certificate_link, total_lessons,
            completed_lessons`;

        // preparing query
        const query  = `INSERT INTO courses(${insertCourseFields}) 
                        VALUES (?,?,?,?,?,?,?,?,?)`;
        const values = [
            course.userId,
            course.name,
            course.link || null,
            course.categoryId || 1,
            course.notes || null,
            course.completed || false,
            course.certificateLink || null,
            course.totalLessons || null,
            course.completedLessons || null
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
        
        const updateCourseFields = `name = ?, link = ?, category_id = ?, notes = ?, 
            completed = ?, certificate_link = ?, total_lessons = ?, completed_lessons = ?`;

        // preparing query
        const query  = `UPDATE courses SET ${updateCourseFields} WHERE id = ? AND user_id = ?`;
        const values = [
            course.name,
            course.link || null,
            course.categoryId || 1,
            course.notes || null,
            course.completed || false,
            course.certificateLink || null,
            course.totalLessons || null,
            course.completedLessons || null,
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