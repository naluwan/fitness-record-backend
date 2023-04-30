'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const recordsData = [
      {
        date: '2023-04-17',
        weight: 103.3,
        waistline: 101,
        description: '跳繩 x 508',
        sport_category_id: 3,
        user_id: 1,
      },
      {
        date: '2023-04-18',
        weight: 103.7,
        waistline: 101,
        description: '下大雨',
        sport_category_id: 1,
        user_id: 1,
      },
      {
        date: '2023-04-19',
        weight: 102.4,
        waistline: 100,
        description: '下雨',
        sport_category_id: 1,
        user_id: 1,
      },
      {
        date: '2023-04-20',
        weight: 103,
        waistline: 100,
        description: '下雨',
        sport_category_id: 1,
        user_id: 1,
      },
      {
        date: '2023-04-24',
        weight: 102.3,
        waistline: 99,
        description: '鐵腿',
        sport_category_id: 1,
        user_id: 1,
      },
      {
        date: '2023-04-17',
        weight: 65,
        waistline: 50,
        description: '跳繩 x 530',
        sport_category_id: 3,
        user_id: 2,
      },
      {
        date: '2023-04-18',
        weight: 64.7,
        waistline: 50,
        description: '鐵腿，好累',
        sport_category_id: 1,
        user_id: 2,
      },
      {
        date: '2023-04-19',
        weight: 64.3,
        waistline: 49.8,
        description: '下大雨',
        sport_category_id: 1,
        user_id: 2,
      },
      {
        date: '2023-04-25',
        weight: 63.8,
        waistline: 49.8,
        description: '鐵腿還沒好....',
        sport_category_id: 1,
        user_id: 2,
      },
    ];
    await queryInterface.bulkInsert(
      'Records',
      recordsData.map((item) => {
        const { date, weight, waistline, description, sport_category_id, user_id } = item;
        return {
          date,
          weight,
          waistline,
          description,
          sport_category_id,
          user_id,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Records', {});
  },
};
