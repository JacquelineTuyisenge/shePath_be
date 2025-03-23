// seeders/xxxxxx-demo-like.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch topic IDs
    const topics = await queryInterface.sequelize.query(
      `SELECT id, content FROM topics;`
    );

    const topicMap = {};
    topics[0].forEach((topic) => {
      topicMap[topic.content] = topic.id;
    });

    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users;`
    );
  
    const userMap = {};
    users[0].forEach((user) => {
      userMap[user.email] = user.id;
    });

    // Insert likes with topicId
    await queryInterface.bulkInsert("likes", [
      {
        id: Sequelize.literal("gen_random_uuid()"),
        topicId: topicMap["Welcome to the community! This is where you can post your topics."], // Linking to topic
        userId: userMap["admin@example.com"],// Replace with actual user UUID for liker
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        topicId: topicMap["Discussing the best practices for React development."], // Linking to topic
        userId: userMap["learner@example.com"],// Replace with actual user UUID for liker
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("likes", null, {});
  },
};
