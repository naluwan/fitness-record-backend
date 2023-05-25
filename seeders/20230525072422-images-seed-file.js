'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const imagesData = [
      {
        record_id: 1,
        user_id: 1,
        url: 'https://i.imgur.com/892Ul7t.jpg',
      },
      {
        record_id: 2,
        user_id: 1,
        url: 'https://i.imgur.com/PJrhDXf.jpg',
      },
      {
        record_id: 3,
        user_id: 1,
        url: 'https://i.imgur.com/892Ul7t.jpg',
      },
      {
        record_id: 4,
        user_id: 1,
        url: 'https://i.imgur.com/PJrhDXf.jpg',
      },
      {
        record_id: 5,
        user_id: 1,
        url: 'https://i.imgur.com/892Ul7t.jpg',
      },
      {
        record_id: 6,
        user_id: 2,
        url: 'https://i.imgur.com/ys6FtVf.jpg',
      },
      {
        record_id: 7,
        user_id: 2,
        url: 'https://i.imgur.com/nMbMdeV.jpg',
      },
      {
        record_id: 8,
        user_id: 2,
        url: 'https://i.imgur.com/ys6FtVf.jpg',
      },
      {
        record_id: 9,
        user_id: 2,
        url: 'https://i.imgur.com/nMbMdeV.jpg',
      },
      {
        record_id: 10,
        user_id: 3,
        url: 'https://i.imgur.com/cUcpgWv.jpg',
      },
      {
        record_id: 11,
        user_id: 3,
        url: 'https://i.imgur.com/tQcTOLH.jpg',
      },
      {
        record_id: 12,
        user_id: 3,
        url: 'https://i.imgur.com/cUcpgWv.jpg',
      },
      {
        record_id: 13,
        user_id: 3,
        url: 'https://i.imgur.com/tQcTOLH.jpg',
      },
      {
        record_id: 14,
        user_id: 4,
        url: 'https://i2.milimaj.com/i/milliyet/75/869x477/5e2e1ea75542841b0843c787.jpg',
      },
      {
        record_id: 15,
        user_id: 4,
        url: 'https://scpr.brightspotcdn.com/dims4/default/38eb0f8/2147483647/strip/true/crop/640x426+0+0/resize/880x586!/quality/90/?url=http%3A%2F%2Fscpr-brightspot.s3.amazonaws.com%2Flegacy%2Fi%2Ffb409ecdbcd752542cb7f0977f5446e0%2F5b2c35a94488b30009270f64-original.jpg',
      },
      {
        record_id: 15,
        user_id: 4,
        url: 'https://thoughtsfromthebench379373603.files.wordpress.com/2020/01/kobe-1.jpg?w=840',
      },
      {
        record_id: 15,
        user_id: 4,
        url: 'https://www.gannett-cdn.com/authoring/2016/04/14/NTCJ/ghows-KS-3537e349-b3f3-4b93-b9bf-3d4885c4e3ca-7c37e4e4.jpeg?crop=999,564,x0,y51&width=999&height=564&format=pjpg&auto=webp',
      },
      {
        record_id: 16,
        user_id: 4,
        url: 'https://i.ytimg.com/vi/t_YurKl0ry0/maxresdefault.jpg',
      },
    ];
    await queryInterface.bulkInsert(
      'Images',
      imagesData.map((item) => {
        const { record_id, user_id, url } = item;
        return {
          record_id,
          user_id,
          url,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', {});
  },
};
