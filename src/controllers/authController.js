const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { validateUser } = require('../utils/validate');


const save = async (request, response) => {    
    try {
        // get and validate user
        const user = request.body;

        logger.info(user);

        if(!validateUser(user))
            return response.sendStatus(400);

        //hashing password
        user.password = await bcrypt.hash(user.password, 8);       

        // saving user on DB
        await authModel.save(user);   

        return response.sendStatus(201);        
    
    } catch (error) {
        logger.error(error);
        // duplicated email or username 
        if(error.code === 'ER_DUP_ENTRY'){
            logger.error(error);
            if(error.sqlMessage.includes('users.username'))
                return response.status(400).json({ msg: "usuário já cadastrado!" });
            
            return response.status(400).json({ msg: "email já cadastado!" });
        }

        return response.sendStatus(500);
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
        logger.error(error);
        return response.sendStatus(500);
    }
};

module.exports = {
    save,
    getToken,
};