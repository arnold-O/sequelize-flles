"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
        type: Sequelize.STRING,

      },
      password:{
        type: Sequelize.STRING,

      },
      phone_number: {
        type: Sequelize.STRING,
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      resetPasswordExpire: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      user_plan: {
        type: Sequelize.ENUM("planA", "planB"),
        defaultValue: "planA",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
