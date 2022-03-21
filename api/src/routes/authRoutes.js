const authRouter = require("express").Router();
const authController = require("../controllers/authController");

authRouter.post("/", (request, response) => {
    authController.save(request, response);
})

module.exports = authRouter;