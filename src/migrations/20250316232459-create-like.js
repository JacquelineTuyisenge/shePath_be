// migrations/xxxxxx-create-like.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('likes', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        topicId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'topics',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('likes');
    },
  };
  