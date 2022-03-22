const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
    const bearerToken = request.headers["authorization"];

    // no token
    if(!bearerToken)
        return response.status(401).json({message: 'no token'})

    // remove the 'bearer'
    const token = bearerToken.split(" ")[1];

    // invalid token format
    if(!token)
        return response.status(401).json({message: 'invalid token'})

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        // invalid token
        if(err)
            return response.status(401).json({message: 'error validating token'})
        
        request.userId = decoded.id;
        console.log(decoded)
        next();
    });
} 

module.exports = authMiddleware;