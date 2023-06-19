const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { imgurFileHandler } = require('../helpers/file-helpers');
const jwt = require('jsonwebtoken');

const userServices = {
  signUp: (req, cb) => {
    const { name, email, password, passwordCheck, weight, waistline } = req.body;

    if (!name || !email || !password || !passwordCheck) {
      throw new Error('所有欄位都是必填的');
    }

    if (password !== passwordCheck) {
      throw new Error('密碼與確認密碼不相符');
    }

    const { file } = req;

    return User.findOne({ where: { email } })
      .then((user) => {
        if (user) throw new Error('此帳號已註冊過');
        return bcrypt.hash(password, 10);
      })
      .then((hash) => {
        return imgurFileHandler(file).then((file) => {
          return User.create({
            name,
            email,
            weight,
            waistline,
            password: hash,
            avatar: file.link || 'https://i.imgur.com/PGbAlS3.png',
          });
        });
      })
      .then((createUser) => {
        const user = createUser.toJSON();
        delete user.password;
        return cb(null, user);
      })
      .catch((err) => cb(err));
  },
  lineLogin: (req, cb) => {
    const { id_token } = req.body;
    const decodeIdToken = jwt.decode(id_token);
    const { name, email, picture } = decodeIdToken;
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return cb(null, { user, idToken: id_token });

      const randomPassword = Math.random().toString(36).slice(-8);
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(randomPassword, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            weight: null,
            waistline: null,
            password: hash,
            avatar: picture || 'https://i.imgur.com/PGbAlS3.png',
          }),
        )
        .then((user) => cb(null, { user, idToken: id_token }))
        .catch((err) => cb(err));
    });
  },
};

module.exports = userServices;
