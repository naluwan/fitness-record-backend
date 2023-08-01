const { User } = require('../models');

const rankServices = {
  weightRank: (req, cb) => {
    return User.findAll({
      nest: true,
      raw: true,
      order: [['weightDiff', 'ASC']],
    })
      .then((weightRankUsers) => {
        // 將體重差異做升冪排列，去除null值
        const currentRankUsers = weightRankUsers.filter((user) => user.weightDiff !== null);

        // 去除使用者敏感資訊
        currentRankUsers.forEach((user) => delete user.password);

        cb(null, { users: currentRankUsers });
      })
      .catch((err) => cb(err));
  },
  waistlineRank: (req, cb) => {
    return User.findAll({
      nest: true,
      raw: true,
      order: [['waistlineDiff', 'ASC']],
    })
      .then((waistlineRankUsers) => {
        // 將體重差異做升冪排列，去除null值
        const currentRankUsers = waistlineRankUsers.filter((user) => user.waistlineDiff !== null);

        // 去除使用者敏感資訊
        currentRankUsers.forEach((user) => delete user.password);

        cb(null, { users: currentRankUsers });
      })
      .catch((err) => cb(err));
  },
};

module.exports = rankServices;
