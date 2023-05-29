const passport = require('passport');
const LocalStrategy = require('passport-local');
const LineStrategy = require('passport-line-auth').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

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

passport.use(
  new LineStrategy(
    {
      channelID: process.env.LINE_LOGIN_CHANNEL_ID,
      channelSecret: process.env.LINE_LOGIN_CHANNEL_SECRET,
      callbackURL: process.env.LINE_LOGIN_CALLBACK_URL,
      scope: ['profile', 'openid', 'email'],
    },
    (accessToken, refreshToken, params, profile, cb) => {
      // 添加email資料
      const { email } = jwt.decode(params.id_token);
      profile.email = email;

      // 確認使用者
      return User.findOne({ where: { email: profile.email } }).then((user) => {
        // 有該使用者資料就返回
        if (user) return cb(null, user);

        // 沒有資料就建立一個，密碼採隨機產生
        const randomPassword = Math.random().toString(36).slice(-8);
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(randomPassword, salt))
          .then((hash) =>
            User.create({
              name: profile.displayName,
              email,
              weight: null,
              waistline: null,
              password: hash,
              avatar: profile.pictureUrl || 'https://i.imgur.com/PGbAlS3.png',
            }),
          )
          .then((user) => cb(null, user))
          .catch((err) => cb(err));
      });
    },
  ),
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
