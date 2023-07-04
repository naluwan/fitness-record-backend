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
  lineLogin: (req, res, next) => {
    userServices.lineLogin(req, (err, data) => {
      if (err) next(err);
      const userData = data.user.dataValues;
      delete userData.password;
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.json({
        status: 'success',
        token,
        idToken: data.idToken,
        user: userData,
      });
    });
  },
  signInFail: (err, req, res, next) => {
    err.status = 401;
    err.message = req.flash('error_message').toString();
    next(err);
  },
  auth: (req, res, next) => {
    const user = req.user;
    res.json({ status: 'success', data: { user } });
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => {
      delete data.user.dataValues.password;
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
};

module.exports = userController;
