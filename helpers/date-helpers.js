const dayjs = require('dayjs');

module.exports = {
  dateFormat: (date) => dayjs(date).format('YYYY-MM-DD'),
};
