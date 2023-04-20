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
    console.log('user ===> ', req.user);
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
};

module.exports = recordServices;
