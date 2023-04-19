const bcrypt = require('bcryptjs');
const { User } = require('../models');

const userServices = {
  signUp: (req, cb) => {
    const { name, email, password, passwordCheck } = req.body;
    if (!name || !email || !password || !passwordCheck) {
      throw new Error('所有欄位都是必填的');
    }

    if (password !== passwordCheck) {
      throw new Error('密碼與確認密碼不相符');
    }

    return User.findOne({ where: { email } })
      .then((user) => {
        if (user) throw new Error('此帳號已註冊過');
        return bcrypt.hash(password, 10);
      })
      .then((hash) => {
        return User.create({
          name,
          email,
          password: hash,
        });
      })
      .then((createUser) => {
        const user = createUser.toJSON();
        delete user.password;
        return cb(null, user);
      })
      .catch((err) => cb(err));
  },
};

module.exports = userServices;
