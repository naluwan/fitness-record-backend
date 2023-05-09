const { Record, SportCategory, User } = require('../models');
const { dateFormat } = require('../helpers/date-helpers');

const recordServices = {
  getRecords: (req, cb) => {
    const userId = Number(req.query.userId) || '';
    const sportCategoryId = Number(req.query.sportCategoryId) || '';

    Promise.all([
      Record.findAndCountAll({
        include: [SportCategory, User],
        where: {
          ...(sportCategoryId ? { sportCategoryId } : {}),
          ...(userId ? { userId } : {}),
        },
        nest: true,
        raw: true,
        order: [
          ['date', 'DESC'],
          ['id', 'DESC'],
        ],
      }),
      SportCategory.findAll({ raw: true }),
    ])
      .then(([records, sportCategories]) => {
        const data = records.rows.map((r) => {
          delete r.User.password;
          return {
            ...r,
            date: dateFormat(r.date),
            description: r.description.substring(0, 50),
          };
        });

        return cb(null, {
          records: data,
          sportCategories,
          sportCategoryId,
          userId,
        });
      })
      .catch((err) => cb(err));
  },
  postRecord: (req, cb) => {
    const userId = req.user.id;
    const { date, weight, waistline, description, sportCategoryId } = req.body;
    if (!date || !weight || !sportCategoryId) throw new Error('日期、體重和運動類型為必填欄位');

    return User.findByPk(userId)
      .then((user) => {
        if (!user) throw new Error('查無使用者，請重新嘗試');
        if (user.weight === null) throw new Error('請先至個人檔案設定目前體重，再進行新增記錄');
        if (user.waistline === null && waistline)
          throw new Error('請先至個人檔案設定目前腰圍，再進行新增記錄');

        const weightDiff = Number(((weight / user.weight - 1) * 100).toFixed(2));
        let waistlineDiff = 0;
        if (user.waistline !== null && waistline) {
          waistlineDiff = Number(((waistline / user.waistline - 1) * 100).toFixed(2));
        }

        return Promise.all([
          Record.create({
      date,
      weight,
      waistline,
      description,
      sportCategoryId,
      userId,
          }),
          user.update({
            nowWeight: weight,
            nowWaistline: waistline,
            weightDiff,
            waistlineDiff,
          }),
        ]);
    })
      .then(([createRecord, updateUser]) => {
        return Record.findByPk(createRecord.id, {
          include: [SportCategory, User],
          nest: true,
          raw: true,
        });
      })
      .then((record) => {
        delete record.User.password;
        return cb(null, { record });
      })
      .catch((err) => cb(err));
  },
  editRecord: (req, cb) => {
    Promise.all([
      Record.findByPk(req.params.id, {
        include: [SportCategory, User],
        nest: true,
        raw: true,
      }),
      SportCategory.findAll({ raw: true }),
    ])
      .then(([record, sportCategories]) => {
        if (!record) throw new Error('查無此紀錄');
        delete record.User.password;
        return cb(null, { record, sportCategories });
      })
      .catch((err) => cb(err));
  },
  putRecord: (req, cb) => {
    const { date, weight, waistline, description, sportCategoryId } = req.body;
    if (!date || !weight) throw new Error('日期、體重為必填欄位');
    Record.findByPk(req.params.id)
      .then((record) => {
        if (!record) throw new Error('查無此紀錄');
        return record.update({
          date,
          weight,
          waistline,
          description,
          sportCategoryId,
        });
      })
      .then((updateRecord) => {
        return Record.findByPk(updateRecord.id, {
          include: [SportCategory, User],
          nest: true,
          raw: true,
        });
      })
      .then((record) => {
        delete record.User.password;
        return cb(null, { record });
      })
      .catch((err) => cb(err));
  },
  deleteRecord: (req, cb) => {
    return Record.findByPk(req.params.id)
      .then((record) => {
        if (!record) throw new Error('查無此紀錄');
        return record.destroy();
      })
      .then((deleteRecord) => cb(null, { record: deleteRecord }))
      .catch((err) => cb(err));
  },
};

module.exports = recordServices;
