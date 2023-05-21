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
      {
        name: 'kobe',
        email: 'kobe@example.com',
        password: await bcrypt.hash('test1234', 10),
        avatar:
          'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.18169-9/13177146_10154154195750419_4907503626014205768_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gwkFl-F0UvkAX9SzFA5&_nc_ht=scontent-tpe1-1.xx&oh=00_AfAUR0uET6dVtuO4tdoLSZScdXdw_IXVR1RKv3XDHKH5UA&oe=64855F6B',
        weight: 100,
        waistline: 90,
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
