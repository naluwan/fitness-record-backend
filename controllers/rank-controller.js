const { rankServices } = require('../services');

const rankController = {
  weightRank: (req, res, next) => {
    rankServices.weightRank(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
  waistlineRank: (req, res, next) => {
    rankServices.waistlineRank(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
};

module.exports = rankController;
