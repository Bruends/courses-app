const coursesRouter = require('express').Router();
const coursesController = require('../controllers/coursesController');

coursesRouter.get('/', (request, response) => {
    coursesController.getAll(request, response);
});

coursesRouter.get('/:id', (request, response) => {
    coursesController.getById(request, response);
});

coursesRouter.post('/', (request, response) => {
    coursesController.save(request, response);
});

coursesRouter.put('/', (request, response) => {
    coursesController.update(request, response);
})

coursesRouter.delete('/:id', (request, response) => {
    coursesController.remove(request, response);
});

module.exports = coursesRouter;