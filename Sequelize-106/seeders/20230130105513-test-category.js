'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const item =  categoryFaker(10)
      await queryInterface.bulkInsert('Categories', item, {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Categories', null, {});

  }
};


function categoryFaker(count){
  const data = []

  for (let i = 0; i < count; i++) {
    const item = {
      name:  faker.commerce.department(),
      categoryImage:faker.image.image(),
      status: faker.helpers.arrayElement([1, 0]),
      
    };
    data.push(item)
  }
  return data

}