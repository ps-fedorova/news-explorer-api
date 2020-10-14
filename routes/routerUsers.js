const usersRouter = require('express').Router();
const { validateId } = require('../middleware/celebrateValidation/celebrateValidation');
const { getCurrentUser } = require('../controllers/controllersUsers');

usersRouter.get('/me', validateId, getCurrentUser);

module.exports = usersRouter;
