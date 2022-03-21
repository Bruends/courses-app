const authModel = require('../models/authModel');
const bcrypt = require("bcrypt");

const save = async (request, response) => {
    const user = request.body;

    try {
        //hashing password
        user.password = await bcrypt.hash(user.password, 8);       

        // saving user on DB
        authModel.save(user);
        console.log("save request: ", user);


        return response.status(201).json({});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    save
}