// seeders/xxxxxx-demo-messages.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('messages', [
        {
          id: Sequelize.literal("gen_random_uuid()"),
          email: 'john.doe@example.com',
          message: 'Hello, this is a test message!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal("gen_random_uuid()"),
          email: 'jane.doe@example.com',
          message: 'Another test message!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('messages', null, {});
    },
  };
  