const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.info(`fitnessRecord app listening on http://localhost:${port}`);
});

module.exports = app;
