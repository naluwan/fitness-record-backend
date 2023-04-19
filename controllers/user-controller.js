const { userServices } = require('../services');
const jwt = require('jsonwebtoken');

const userController = {
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON();
      delete userData.password;
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.json({
        status: 'success',
        token,
        user: userData,
      });
    } catch (err) {
      next(err);
    }
  },
  signInFail: (err, req, res, next) => {
    err.status = 401;
    err.message = req.flash('error_message').toString();
    next(err);
  },
};

module.exports = userController;
