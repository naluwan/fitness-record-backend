const { sportCategoryServices } = require('../services');

const sportCategoryController = {
  getAllCategories: (req, res, next) => {
    sportCategoryServices.getAllCategories(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
};

module.exports = sportCategoryController;
