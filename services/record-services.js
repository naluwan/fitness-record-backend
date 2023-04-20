const { Record, SportCategory, User } = require('../models');

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
        order: [['date', 'DESC']],
      }),
      SportCategory.findAll({ raw: true }),
    ])
      .then(([records, sportCategories]) => {
        const data = records.rows.map((r) => ({
          ...r,
          description: r.description.substring(0, 50),
        }));

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
    if (!date || !weight) throw new Error('日期、體重為必填欄位');

    return Record.create({
      date,
      weight,
      waistline,
      description,
      sportCategoryId,
      userId,
    })
      .then((createRecord) => {
        cb(null, { record: createRecord });
      })
      .catch((err) => cb(err));
  },
  editRecord: (req, cb) => {
    Record.findByPk(req.params.id, { raw: true })
      .then((record) => {
        if (!record) throw new Error('查無此紀錄');
        return cb(null, record);
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
      .then((updateRecord) => cb(null, { record: updateRecord }))
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
