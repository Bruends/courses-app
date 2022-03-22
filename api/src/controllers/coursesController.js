const coursesModel = require('../models/coursesModel');

const getAll = async (request, response) => {
    const { userId } = request;

    try {
        const courses = await coursesModel.getAll(userId);
        return response.status(200).json( courses );
    } catch (error) {
        console.log(error);
        return response.status(500);
    }
} 

const getById = async (request, response) =>  {
    try {
        const { id } = request.params;
        const course = await coursesModel.getById(id);
        return response.status(200).json(course[0]);
    } catch (error) {
        console.log(error);
        return response.status(500);
    }
}

const save = (request, response) => {
    const { userId } = request;

    // getting the request values
    const course = request.body;

    course.userId = userId;
    
    coursesModel.save(course);

    console.log("save request: ", course);

    return response.status(201).json({});
}

const update = async (request, response) => {
    try {
        // getting the request values
        const course = request.body;       

        coursesModel.update(course);

        console.log("update request: ", course);

        return response.status(200).json({});
    } catch(error) {
        console.log(error);
        return response.status(500);
    }

}

const remove = async (request, response) => {
    const { id } = request.params;
    console.log(id);

    try {
        // deleting course 
        coursesModel.remove(id);
        
        response.status(200).json({});

    } catch(error) {
        console.log(error);
        return response.status(500);
    }
}

module.exports = {
    getAll,
    getById,
    save,
    update,
    remove,
};