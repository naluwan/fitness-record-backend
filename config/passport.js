const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    (req, email, password, cb) => {
      User.findOne({ where: { email } }).then((user) => {
        if (!user) return cb(null, false, req.flash('error_message', '查無此帳號'));
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) return cb(null, false, req.flash('error_message', '密碼錯誤'));

          return cb(null, user);
        });
      });
    },
  ),
);

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }),
);

// 序列化 - 將資料轉為可儲存形式的過程(process)
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// 反序列化 - 在需要的時候，可以將資料恢復原先狀態
passport.deserializeUser((id, cb) => {
  User.findByPk(id)
    .then((user) => {
      // 使用toJSON()將資料簡化成容易取用的樣子
      user = user.toJSON();
      return cb(null, user);
    })
    .catch((err) => cb(err));
});

module.exports = passport;
