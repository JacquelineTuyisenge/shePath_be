// migrations/xxxxxx-create-topic.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topics', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // Ensure you have 'users' table
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
    await queryInterface.dropTable('topics');
  },
};
