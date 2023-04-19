const { userServices } = require('../services');

const userController = {
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
};

module.exports = userController;
