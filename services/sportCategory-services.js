const { SportCategory } = require('../models');

const sportCategoryServices = {
  getAllCategories: (req, cb) => {
    return SportCategory.findAll({ raw: true })
      .then((sportCategories) => cb(null, sportCategories))
      .catch((err) => cb(err));
  },
};

module.exports = sportCategoryServices;
