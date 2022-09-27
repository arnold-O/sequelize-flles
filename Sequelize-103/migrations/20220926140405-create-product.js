'use strict';
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
      des: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      status:{
        type:Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        default:"INACTIVE"
      }
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};