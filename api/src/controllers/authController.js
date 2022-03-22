const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const save = async (request, response) => {
    const user = request.body;

    try {
        //hashing password
        user.password = await bcrypt.hash(user.password, 8);       

        // saving user on DB
        authModel.save(user);
        console.log('save request: ', user);

        user.password = null;
        return response.status(201).json({ user });
    } catch (error) {
        console.log(error);
    }
};

const getToken = async (request, response) => {    
    try {        
        // getting request data
        const { username, password } = request.body;
        
        // getting user 
        const [user] = await authModel.findByUsername(username);
        
        // username not found
        if(!user)
            return response.sendStatus(401);

        //check password match
        const passwordMatch = await bcrypt.compare(password, user.password); 

        // password doesn't match
        if(!passwordMatch)
            return response.sendStatus(401);

        // generating JWT
        const token  = jwt.sign({ id: user.id }, process.env.SECRET);
        return response.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
};

module.exports = {
    save,
    getToken,
};