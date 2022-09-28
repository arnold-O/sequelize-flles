'use strict';

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
       name: 'Joshua Doe',
       des: 'this is a sample description 1',
       amount:181,
       status:"ACTIVE"
      },
    
      {
       name: 'Jane Doe',
       des: 'this is a sample description 2',
       amount:78,
       status:"ACTIVE"
      },
    
      {
       name: 'Great Doe',
       des: 'this is a sample description number 3',
       amount:2350,
       status:"INACTIVE"
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
