'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'SportCategories',
      ['休息', '跑步', '跳繩', '籃球', '游泳', '重訓'].map((item) => {
        return {
          name: item,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SportCategories', {});
  },
};
