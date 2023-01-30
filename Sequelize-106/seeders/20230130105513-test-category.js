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
     * */
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'category 1',
        categoryImage: 'example.jpg',
        status:1
      },
        {
        name: 'category 2',
        categoryImage: 'dummy.png',
        status:1
      },
        {
        name: 'category 3',
        categoryImage:' dummy.png',
        status:0
      },
        {
        name: 'category 4',
        categoryImage:' clear.png',
        status:1
      },
        {
        name: 'category 5',
        categoryImage:' rate.png',
        status:1
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
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
