const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/register', (request, response) => {
    authController.save(request, response);
});

authRouter.post('/login', (request, response) => {
    authController.getToken(request, response);
});

module.exports = authRouter;
