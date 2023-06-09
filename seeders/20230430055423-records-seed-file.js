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
      {
        date: '2023-04-17',
        weight: 8,
        waistline: 5,
        description: '剛開始會爬',
        sport_category_id: 2,
        user_id: 3,
      },
      {
        date: '2023-04-18',
        weight: 8.2,
        waistline: 5,
        description: '拔拔在澡盆讓我游泳',
        sport_category_id: 5,
        user_id: 3,
      },
      {
        date: '2023-04-19',
        weight: 8.2,
        waistline: 5.1,
        description: '休息一下～～',
        sport_category_id: 1,
        user_id: 3,
      },
      {
        date: '2023-04-25',
        weight: 8.3,
        waistline: 5.2,
        description: '我會扶站和扶走了！！！',
        sport_category_id: 2,
        user_id: 3,
      },
      {
        date: '2023-04-26',
        weight: 94,
        waistline: 85,
        description: '慢跑1小時',
        sport_category_id: 2,
        user_id: 4,
      },
      {
        date: '2023-04-25',
        weight: 95,
        waistline: 87,
        description: '游泳3km',
        sport_category_id: 5,
        user_id: 4,
      },
      {
        date: '2023-04-20',
        weight: 97,
        waistline: 89,
        description: '跳繩 x 2500',
        sport_category_id: 3,
        user_id: 4,
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
