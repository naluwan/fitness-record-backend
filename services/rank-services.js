const { User } = require('../models');

const rankServices = {
  weightRank: (req, cb) => {
    User.findAll({
      nest: true,
      raw: true,
      order: [['weightDiff', 'ASC']],
    })
      .then((weightRankUsers) => {
        // 將體重差異做升冪排列，去除null的值並取前三名
        const currentRankUsers = weightRankUsers
          .filter((user) => user.weightDiff !== null)
          .slice(0, 3);

        // 去除使用者敏感資訊
        currentRankUsers.forEach((user) => delete user.password);

        cb(null, { weightRankUsers: currentRankUsers });
      })
      .catch((err) => cb(err));
  },
};

module.exports = rankServices;
