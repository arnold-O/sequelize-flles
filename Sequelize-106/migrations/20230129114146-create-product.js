'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.ENUM('active', 'inactive'),
        defaultValue:'active'
      },
      amount: {
        type: Sequelize.INTEGER
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};