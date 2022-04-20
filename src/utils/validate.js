const validateUser = (user) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // no email or invalid email
    if(!user.email || !emailRegex.test(user.email))
        return false;

    // no username or username < 3 characters
    if(!user.username || user.username.length < 3)
        return false;

    // no password or password < 8 characteres
    if(!user.password || user.password.length < 8)
        return false;

    // valid user
    return true
};

const validateCourse = (course) => {
    // no name
    if(!course.name) 
        return false;
    
    // course should have a category id, or a new category
    if(!course.category && !course.category_id)
        return false;

    // valid course
    return true;
};

module.exports = {
    validateUser,
    validateCourse
};