'use strict';
const { faker } =  require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const itemValues = dummyFaker(10)
     await queryInterface.bulkInsert('Products', itemValues, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};



function dummyFaker(count){

  const data = []

  for (let i = 0; i < count; i++) {
    const item = {
      name: faker.commerce.productName(),
      description: `this is description of product ${i+1}`,
      status: faker.helpers.arrayElement(['active', 'inactive']),
      amount: faker.commerce.price(),
    };
    data.push(item)
  }
  return data

}
