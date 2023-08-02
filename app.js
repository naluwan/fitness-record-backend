if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const routes = require('./routes');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');
const cors = require('cors');
const socket = require('socket.io');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

// 實作socket.io
const server = http.Server(app);
const io = socket(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(
  cors({
    credentials: true,
    preflightContinue: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: '*',
  }),
);
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(routes);

// socket.io監聽事件
io.on('connection', (socket) => {
  console.log('================ socket connect!! ==================');
  console.log(`socket ID ====> `, socket.id);

  socket.on('updateRanking', (needUpdateRanking) => {
    console.log('from client socket ====>', needUpdateRanking);
    io.sockets.emit('updateRanking', needUpdateRanking);
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
    io.sockets.emit('disConnect', 'user close page');
  });
});

// 這邊要改成直接監聽socket server
server.listen(port, () => {
  console.info(`fitnessRecord app listening on http://localhost:${port}`);
});

module.exports = app;
