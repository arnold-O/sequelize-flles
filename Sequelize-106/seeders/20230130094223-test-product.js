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
       name: 'Amen Musia',
       description: 'Seeder sample 1',
       status: 'active',
       amount: 750
     },
      {
       name: 'faud  moin',
       description: 'Seeder sample 2',
       status: 'inactive',
       amount: 450
     },
      {
       name: 'Lion Hitler',
       description: 'Seeder sample 3',
       status: 'active',
       amount: 250
     },
      {
       name: 'Gills Gilbert',
       description: 'Seeder sample 4',
       status: 'active',
       amount: 650
     },
      {
       name: 'Esco Maribo',
       description: 'Seeder sample 5',
       status: 'active',
       amount: 400
     },
      {
       name: 'Shephard Pulang',
       description: 'Seeder sample 6',
       status: 'active',
       amount: 200
     },
      {
       name: 'Moses Chibuike',
       description: 'Seeder sample 7',
       status: 'active',
       amount: 800
     },
      {
       name: 'kamulunga will',
       description: 'Seeder sample 8',
       status: 'active',
       amount: 370
     },
      {
       name: 'Will Grace',
       description: 'Seeder sample 9',
       status: 'active',
       amount: 800
     },
      {
       name: 'William Naruto',
       description: 'Seeder sample 10',
       status: 'active',
       amount: 800
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
