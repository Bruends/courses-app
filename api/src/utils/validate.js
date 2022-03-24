const validateUser = (user) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // no email or invalid email
    if(!user.email || !emailRegex.test(user.email))
        return false;

    // no username
    if(!user.username)
        return false;

    // no password or password < 8 characteres
    if(!user.password || user.password.length < 8)
        return false;

    return true;
};

module.exports = {
    validateUser
};