const { recordServices } = require('../services');
const { dateFormat } = require('../helpers/date-helpers');

const recordController = {
  getRecords: (req, res, next) => {
    recordServices.getRecords(req, (err, data) => {
      console.log('controller data ==> ', data);
      console.log('controller data records ==> ', data.records);
      // 刪除使用者敏感資料'
      data.records.rows.forEach((r) => {
        delete r.User.dataValues.password;
        r.dataValues.date = dateFormat(r.dataValues.date);
      });
      err ? next(err) : res.json({ status: 'success', data: { records: data.records.rows } });
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
  deleteRecord: (req, res, next) => {
    recordServices.deleteRecord(req, (err, data) => {
      err ? next(err) : res.json({ status: 'success', data });
    });
  },
};

module.exports = recordController;
