const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { errorHandler } = require('../middleware/error-handler');

router.post('/signup', userController.signUp);

router.use('/', errorHandler);

module.exports = router;
