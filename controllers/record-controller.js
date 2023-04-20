const { recordServices } = require('../services');
const recordController = {
  getRecords: (req, res, next) => {
    recordServices.getRecords(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
  postRecord: (req, res, next) => {
    recordServices.postRecord(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
  editRecord: (req, res, next) => {
    recordServices.editRecord(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
  putRecord: (req, res, next) => {
    recordServices.putRecord(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
};

module.exports = recordController;
