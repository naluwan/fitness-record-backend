const { Record, SportCategory, User, Image } = require('../models');

const recordServices = {
  getRecords: (req, cb) => {
    const userId = Number(req.query.userId) || '';
    const sportCategoryId = Number(req.query.sportCategoryId) || '';

    return Promise.all([
      Record.findAndCountAll({
        include: [SportCategory, User, Image],
        where: {
          ...(sportCategoryId ? { sportCategoryId } : {}),
          ...(userId ? { userId } : {}),
        },
        order: [
          ['date', 'DESC'],
          ['id', 'DESC'],
          [Image, 'id', 'ASC'],
        ],
      }),
      SportCategory.findAll({ raw: true }),
    ])
      .then(([records, sportCategories]) => {
        console.log('record service records ==> ', records);
        return cb(null, {
          records,
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
        // 驗證使用者是否有填入預設體重和腰圍
        // 腰圍為非必填，但有記錄有填腰圍食，使用者資訊的腰圍就必填
        if (user.weight === null) throw new Error('請先至個人檔案設定目前體重，再進行新增記錄');
        if (user.waistline === null && waistline)
          throw new Error('請先至個人檔案設定目前腰圍，再進行新增記錄');

        // 獲取該使用者所有的貼文並找出最後一篇貼文的日期
        return Record.findAll({ where: { userId } }).then((allRecords) => {
          const lastPostDate = Math.max(
            ...allRecords.map((recordItem) => new Date(recordItem.date).getTime()),
          );

          // 如果新記錄的日期是最後一篇貼文的日期或大於最後一篇貼文的日期，則更新使用者資訊的體重與腰圍
          if (lastPostDate <= new Date(date).getTime()) {
            // 計算預設體重和腰圍與目前體重和腰圍的差異百分比
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
            ])
              .then(([createRecord, updateUser]) => {
                return Record.findByPk(createRecord.id, {
                  include: [SportCategory, User, Image],
                  nest: true,
                  raw: true,
                });
              })
              .then((record) => {
                delete record.User.password;
                return cb(null, { record });
              });
          } else {
            // 新記錄的日期小於最後一篇貼文的日期，代表是補之前的記錄，僅需要新增記錄不需要更新使用者資訊
            return Record.create({
              date,
              weight,
              waistline,
              description,
              sportCategoryId,
              userId,
            })
              .then((createRecord) => {
                return Record.findByPk(createRecord.id, {
                  include: [SportCategory, User, Image],
                  nest: true,
                  raw: true,
                });
              })
              .then((record) => {
                delete record.User.password;
                return cb(null, { record });
              });
          }
        });
      })
      .catch((err) => cb(err));
  },
  editRecord: (req, cb) => {
    return Promise.all([
      Record.findByPk(req.params.id, {
        include: [SportCategory, User, Image],
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
    if (!date || !weight || !sportCategoryId) throw new Error('日期、體重和運動類型為必填欄位');
    if (weight === 0 || waistline === 0) throw new Error('體重和腰圍不可為0');
    return Record.findByPk(req.params.id)
      .then((record) => {
        if (!record) throw new Error('查無此紀錄');

        // 驗證使用者是否有填入預設體重和腰圍
        // 腰圍為非必填，但有記錄有填腰圍食，使用者資訊的腰圍就必填
        return User.findByPk(record.userId).then((user) => {
          if (!user) throw new Error('查無使用者，請重新嘗試');
          if (user.weight === null) throw new Error('請先至個人檔案設定目前體重，再進行新增記錄');
          if (user.waistline === null && waistline)
            throw new Error('請先至個人檔案設定目前腰圍，再進行新增記錄');

          // 由於更新日期會影響是否更新使用者資訊，所以必須要先更新日期
          return record
            .update({
              date,
            })
            .then((updateRecordDate) => {
              // 獲取該使用者所有的貼文並找出最後一篇貼文的日期
              return Record.findAll({ where: { userId: record.userId } }).then((allRecords) => {
                const lastPostDate = Math.max(
                  ...allRecords.map((recordItem) => new Date(recordItem.date).getTime()),
                );

                // 如果修改後的日期是最後一篇貼文的日期或大於最後一篇貼文的日期，則更新使用者資訊的體重與腰圍
                if (lastPostDate <= new Date(date).getTime()) {
                  // 計算預設體重和腰圍與目前體重和腰圍的差異百分比
                  const weightDiff = Number(((weight / user.weight - 1) * 100).toFixed(2));
                  let waistlineDiff = 0;
                  if (user.waistline !== null && waistline) {
                    waistlineDiff = Number(((waistline / user.waistline - 1) * 100).toFixed(2));
                  }

                  return Promise.all([
                    record.update({
                      weight,
                      waistline,
                      description,
                      sportCategoryId,
                    }),
                    User.findByPk(record.userId).then((user) => {
                      return user.update({
                        nowWeight: weight,
                        nowWaistline: waistline,
                        weightDiff,
                        waistlineDiff,
                      });
                    }),
                  ]);
                } else {
                  return Promise.all([
                    record.update({
                      weight,
                      waistline,
                      description,
                      sportCategoryId,
                    }),
                    Record.findAll({
                      where: { date: new Date(lastPostDate) },
                      nest: true,
                      raw: true,
                      order: [['id', 'DESC']],
                    }).then((records) => {
                      // 最後一篇貼文可能會有好幾篇，所以使用除了查詢日期外，再使用id做排序，id越大代表越新
                      const lastRecord = records[0];
                      return User.findByPk(lastRecord.userId).then((user) => {
                        const weightDiff = Number(
                          ((lastRecord.weight / user.weight - 1) * 100).toFixed(2),
                        );
                        let waistlineDiff = 0;
                        if (user.waistline !== null && lastRecord.waistline) {
                          waistlineDiff = Number(
                            ((lastRecord.waistline / user.waistline - 1) * 100).toFixed(2),
                          );
                        }

                        return user.update({
                          nowWeight: lastRecord.weight,
                          nowWaistline: lastRecord.waistline,
                          weightDiff,
                          waistlineDiff,
                        });
                      });
                    }),
                  ]);
                }
              });
            })
            .then(([updateRecord, updateUser]) => {
              return Record.findByPk(updateRecord.id, {
                include: [SportCategory, User, Image],
                nest: true,
                raw: true,
              });
            })
            .then((record) => {
              delete record.User.password;
              return cb(null, { record });
            });
        });
      })
      .catch((err) => cb(err));
  },
  deleteRecord: (req, cb) => {
    return Promise.all([
      Record.findByPk(req.params.id),
      Image.findAll({ where: { recordId: req.params.id } }),
    ])
      .then(([record, images]) => {
        if (!record) throw new Error('查無此紀錄');

        return Promise.all([record.destroy(), images.map((image) => image.destroy())]);
      })
      .then(([deleteRecord, deleteImages]) => {
        // 獲取該使用者所有的貼文並找出最後一篇貼文的日期
        let imagesArr = [];
        deleteImages.forEach((image) =>
          image.then((imageItem) => {
            const { recordId, userId, url } = imageItem;
            imagesArr.push({ recordId, userId, url });
          }),
        );

        return Record.findAll({ where: { userId: deleteRecord.userId } }).then((allRecords) => {
          // 驗證該使用者是否還有貼文
          if (allRecords.length > 0) {
            const lastPostDate = Math.max(
              ...allRecords.map((recordItem) => new Date(recordItem.date).getTime()),
            );

            return Record.findAll({
              where: { date: new Date(lastPostDate), userId: deleteRecord.userId },
              nest: true,
              raw: true,
              order: [['id', 'DESC']],
            })
              .then((records) => {
                // 最後一篇貼文可能會有好幾篇，所以使用除了查詢日期外，再使用id做排序，id越大代表越新
                const lastRecord = records[0];
                return User.findByPk(lastRecord.userId).then((user) => {
                  const weightDiff = Number(
                    ((lastRecord.weight / user.weight - 1) * 100).toFixed(2),
                  );
                  let waistlineDiff = 0;
                  if (user.waistline !== null && lastRecord.waistline) {
                    waistlineDiff = Number(
                      ((lastRecord.waistline / user.waistline - 1) * 100).toFixed(2),
                    );
                  }

                  // 使用該使用者的最後一篇紀錄來更新使用者資訊
                  return user.update({
                    nowWeight: lastRecord.weight,
                    nowWaistline: lastRecord.waistline,
                    weightDiff,
                    waistlineDiff,
                  });
                });
              })
              .then(() => cb(null, { deleteRecord, images: imagesArr }));
          }
          return User.findByPk(deleteRecord.userId)
            .then((user) => {
              return user.update({
                nowWeight: null,
                nowWaistline: null,
                weightDiff: null,
                waistlineDiff: null,
              });
            })
            .then(() => cb(null, { deleteRecord, images: imagesArr }));
        });
      })
      .catch((err) => cb(err));
  },
};

module.exports = recordServices;
