// seeders/xxxxxx-demo-comment.js
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

    // Insert comments with topicId
    await queryInterface.bulkInsert("comments", [
      {
        id: Sequelize.literal("gen_random_uuid()"),
        content: "Great topic! I totally agree with the points raised here.",
        topicId: topicMap["Welcome to the community! This is where you can post your topics."], // Linking to topic
        userId: userMap["admin@example.com"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        content: "I have a different view on this, let me explain.",
        topicId: topicMap["Discussing the best practices for React development."], // Linking to topic
        userId: userMap["learner@example.com"], // Replace with actual user UUID for comment author
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
