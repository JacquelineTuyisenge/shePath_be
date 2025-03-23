// migrations/xxxxxx-create-messages.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('messages', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('messages');
    },
  };
  