const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const userController = require('../controllers/user-controller');
const recordController = require('../controllers/record-controller');

const record = require('./modules/record');

const { errorHandler } = require('../middleware/error-handler');
const { authenticated } = require('../middleware/auth');

router.use(record);

router.post(
  '/signin',
  passport.authenticate('local', { session: false, failWithError: true }),
  userController.signIn,
  userController.signInFail,
);

router.post('/signup', userController.signUp);

router.use('/', errorHandler);

module.exports = router;
