"use strict";
const { v4: uuidv4 } = require("uuid"); 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(), 
          username: "johndoe",
          email: "johndoe@example.com",
          password: "hashedpassword123", 
          confirmPassword: "hashedpassword123", 
          role: "lumina",
          active: true,
          gender: "Male",
          birthDate: new Date("1990-01-01"),
          phoneNumber: "+1234567890",
          profile: "profile-url",
          address: "123 Main Street",
          country: "Wonderland",
          city: "Dream City",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: "janedoe",
          email: "janedoe@example.com",
          password: "hashedpassword456",
          confirmPassword: "hashedpassword456",
          role: "beacon",
          active: true,
          gender: "Female",
          birthDate: new Date("1995-05-05"),
          phoneNumber: "+0987654321",
          profile: "profile-url",
          address: "456 Elm Street",
          country: "Wonderland",
          city: "Magic City",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
