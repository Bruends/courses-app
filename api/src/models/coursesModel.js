const connect = require('./connect');

const getAll = async () => {
    try {
        const conn = await connect();

        const query = 'SELECT id, name, link FROM courses';

        const [result] = await conn.query(query);
        return result;
    
    } catch (error) {
        console.log(error);
        throw "Error on getting courses";
    }
}

const getById = async (id) => {
    try {
        const conn = await connect();

        const query = 'SELECT id, name, link FROM courses WHERE id = ?';

        const [result] = await conn.query(query, id);
        return result;
    
    }   catch (error) {
        console.log(error);
        throw "Error on getting course";
    }
}

const save = async (course) => {
    try {
        const conn = await connect();
    
        // preparing query
        const query  = 'INSERT INTO courses(user_id, name, link) VALUES (?,?,?);';
        const values = [
            course.user_id,
            course.name,
            course.link
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
    
        // preparing query
        const query  = 'UPDATE courses set name = ?, link = ?  WHERE id = ?';
        const values = [
            course.name,
            course.link,
            course.id
        ]

        return await conn.query(query, values);
    
    } catch (error) {
        console.log(error);
        throw "Error on saving course";
    }
}

const remove = async (id) => {
    try {
        const conn = await connect();
    
        const query = 'DELETE FROM courses WHERE id = ?';
    
        const [ result ] = await conn.query(query, id);
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