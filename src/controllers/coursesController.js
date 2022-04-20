const coursesModel = require('../models/coursesModel');
const categoriesModel = require('../models/categoriesModel');
const logger = require('../utils/logger');
const { validateCourse } = require('../utils/validate');

const getAll = async (request, response) => {
    try {
        // getting user id
        const { userId } = request;
        // getting courses
        const courses = await coursesModel.getAll(userId);
        return response.status(200).json( courses );
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
        return response.sendStatus(500);
    }
};

const save = async (request, response) => {
    // getting request data
    const { userId } = request;
    const course = request.body;
    course.userId = userId;

    // validating course
    if(!validateCourse(course))
        return response.sendStatus(400);

    // if the category is new
    if(!course.categoryId && course.category) {
       const newCategoryId = await addCategoryAndReturnId(course.category);
       course.categoryId = newCategoryId;
    }
    
    // saving new course
    coursesModel.save(course);    

    return response.sendStatus(201);
};

const update = async (request, response) => {
    try {
        // getting request data
        const { userId } = request;
        const course = request.body;
        course.userId = userId;

        // validating course
        if(!validateCourse(course))
            return response.sendStatus(400);

        // if the category is new
        if(!course.categoryId && course.category) {
            const newCategoryId = await addCategoryAndReturnId(course.category);
            course.categoryId = newCategoryId;
        }

        // updating course in DB
        const res = await coursesModel.update(course);
        logger.info(res);

        return response.sendStatus(200);
    } catch(error) {
        logger.error(error);
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
        logger.error(error);
        return response.sendStatus(500);
    }
};

const addCategoryAndReturnId = async (name) => {
    // force lowercase for category name
    const lowerName = name.toLowerCase();

    // check if category already exist
    const category = await categoriesModel.getCategoryId(lowerName);
    if(category.length > 1){
        return category[0].id;
    }

    // save new category otherwise
    const saveResponse = await categoriesModel.save(lowerName);
    return saveResponse.insertId;
};

module.exports = {
    getAll,
    getById,
    save,
    update,
    remove,
};