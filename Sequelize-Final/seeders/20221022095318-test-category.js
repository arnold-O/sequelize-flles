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
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'category one',
        cateImage:"note.png",
        status:1
      },
        {
        name: 'category two',
        cateImage:"note.png",
        status:0
      },
        {
        name: 'category three',
        cateImage:"note.png",
        status:1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
