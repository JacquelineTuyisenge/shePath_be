'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('chats', [
      {
        id: Sequelize.UUIDV4(),
        senderId: 'c0f3ae6f-3dd5-435b-82bf-ae4384848073', // Replace with actual user UUIDs
        receiverId: '9d42b81d-2117-4bf4-9b3c-6b4b21a6a2bd', // Replace with actual user UUIDs
        content: 'Hi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        senderId: '9d42b81d-2117-4bf4-9b3c-6b4b21a6a2bd', // Replace with actual user UUIDs
        receiverId: 'c0f3ae6f-3dd5-435b-82bf-ae4384848073', // Replace with actual user UUIDs
        content: 'Hello, how can I help you today?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chats', null, {});
  },
};