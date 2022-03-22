const coursesModel = require('../models/coursesModel');

const getAll = async (request, response) => {
    try {
        // getting user id
        const { userId } = request;
        //getting courses
        const courses = await coursesModel.getAll(userId);
        return response.status(200).json( courses );
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
}; 

const getById = async (request, response) =>  {
    try {
        // getting user and course id
        const { userId } = request;
        const { id } = request.params;
        
        // consulting db
        const course = await coursesModel.getById(id, userId);
        
        return response.status(200).json(course[0]);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
};

const save = (request, response) => {
    
    // getting request data
    const { userId } = request;
    const course = request.body;
    course.userId = userId;
    
    // saving new user
    coursesModel.save(course);

    console.log('save request: ', course);

    return response.sendStatus(201);
};

const update = async (request, response) => {
    try {
        // getting request data
        const { userId } = request;
        const course = request.body;      
        course.userId = userId;

        // updating course in DB
        coursesModel.update(course);        

        return response.sendStatus(200);
    } catch(error) {
        console.log(error);
        return response.sendStatus(500);
    }

};

const remove = async (request, response) => {
    // getting request data
    const { userId } = request;
    const { id } = request.params;    

    try {
        // deleting course 
        coursesModel.remove(id, userId);        
        response.sendStatus(200);

    } catch(error) {
        console.log(error);
        return response.sendStatus(500);
    }
};

module.exports = {
    getAll,
    getById,
    save,
    update,
    remove,
};