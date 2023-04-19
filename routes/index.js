const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/signup', userController.signUp);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
