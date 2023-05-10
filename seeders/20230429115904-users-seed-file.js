'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        name: 'NaLuWan',
        email: 'example@example.com',
        password: await bcrypt.hash('test1234', 10),
        avatar: 'https://i.imgur.com/sp1lzhg.jpeg',
        weight: 100,
        waistline: 100,
      },
      {
        name: 'Naomi',
        email: 'naomi@example.com',
        password: await bcrypt.hash('test1234', 10),
        avatar: 'https://i.imgur.com/3m8lMpj.jpeg',
        weight: 65,
        waistline: 50,
      },
      {
        name: 'Nonna',
        email: 'nonna@example.com',
        password: await bcrypt.hash('test1234', 10),
        avatar: 'https://i.imgur.com/5Qq7m1z.jpeg',
        weight: 8,
        waistline: 5,
      },
    ];

    await queryInterface.bulkInsert(
      'Users',
      usersData.map((user) => {
        const { name, email, password, avatar, weight, waistline } = user;
        return {
          name,
          email,
          password,
          avatar,
          weight,
          waistline,
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {});
  },
};
