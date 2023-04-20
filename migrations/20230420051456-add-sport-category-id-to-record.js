'use strict';

module.exports = {
  // 新增欄位
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Records', 'sport_category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'SportCategories',
        key: 'id',
      },
    });
  },

  // 刪除欄位
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Records', 'sport_category_id');
  },
};
