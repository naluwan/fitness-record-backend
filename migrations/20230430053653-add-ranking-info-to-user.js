'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'weight', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Users', 'waistline', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Users', 'now_weight', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Users', 'now_waistline', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Users', 'weight_diff', {
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('Users', 'waistline_diff', {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'weight'),
      queryInterface.removeColumn('Users', 'waistline'),
      queryInterface.removeColumn('Users', 'now_weight'),
      queryInterface.removeColumn('Users', 'now_waistline'),
      queryInterface.removeColumn('Users', 'weight_diff'),
      queryInterface.removeColumn('Users', 'waistline_diff'),
    ]);
  },
};
