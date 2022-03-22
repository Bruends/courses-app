const connect = require('./connect');

// field string for selects
const courseFields = `id, user_id, name, link, category_id, notes, 
completed, last_updated, certificate_link, total_lessons,
completed_lessons`;

const getAll = async (userId) => {
    try {
        // connecting
        const conn = await connect();
        // preparing query
        const query = `SELECT ${courseFields} FROM courses WHERE user_id = ?`;
        // exetute query and return courses
        const [result] = await conn.query(query, [userId]);
        return result;
    
    } catch (error) {
        console.log(error);
        throw "Error on getting courses";
    }
}

const getById = async (id, userId) => {
    try {
        const conn = await connect();

        const query = `SELECT ${courseFields} FROM courses WHERE id = ? AND user_id = ?`;

        const [result] = await conn.query(query, [
            id,
            userId
        ]);

        return result;
    
    }   catch (error) {
        console.log(error);
        throw "Error on getting course";
    }
}

const save = async (course) => {
    try {
        const conn = await connect();
        
        const insertCourseFields = `user_id, name, link, category_id, notes, 
            completed, certificate_link, total_lessons,
            completed_lessons`;

        // preparing query
        const query  = `INSERT INTO courses(${insertCourseFields}) 
                        VALUES (?,?,?,?,?,?,?,?,?)`;
        const values = [
            course.userId,
            course.name,
            course.link,
            course.categoryId || 1,
            course.notes || null,
            course.completed || false,
            course.certificateLink || null,
            course.totalLessons || null,
            course.completedLessons || null
        ]

        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw "Error on saving course";
    }
}

const update = async (course) => {
    try {
        const conn = await connect();
        
        const updateCourseFields = `name = ?, link = ?, category_id = ?, notes = ?, 
            completed = ?, certificate_link = ?, total_lessons = ?, completed_lessons = ?`;

        // preparing query
        const query  = `UPDATE courses SET ${updateCourseFields}  WHERE id = ? AND user_id = ?`;
        const values = [
            course.name,
            course.link,
            course.categoryId || 1,
            course.notes || null,
            course.completed || false,
            course.certificateLink || null,
            course.totalLessons || null,
            course.completedLessons || null,
            course.id,
            course.userId,
        ]
        // execute query
        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw "Error on saving course";
    }
}

const remove = async (id, user_id) => {
    try {
        const conn = await connect();
    
        const query = 'DELETE FROM courses WHERE id = ? AND user_id = ?';
    
        const [ result ] = await conn.query(query, [
            id,
            user_id
        ]);
        return result;

    }  catch (error) {
        console.log(error);
        throw "Error on deleting course";
    }
}


module.exports = {
    getAll,
    getById,
    update,
    save,
    remove,
}