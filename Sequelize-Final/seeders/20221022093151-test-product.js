'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Products', [
        {
        name: 'Product One',
        des: 'this is a sample description',
        amount: 200,
        status:"active"

      },
        {
        name: 'Product two',
        des: 'this is a sample description',
        amount: 150,
        status:"active"

      },
        {
        name: 'Product three',
        des: 'this is a sample description',
        amount: 700,
        status:"inactive"

      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('Products', null, {});

  }
};
