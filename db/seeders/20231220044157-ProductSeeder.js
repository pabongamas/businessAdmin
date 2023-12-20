'use strict';
const { PRODUCT_TABLE } = require("./../models/product.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        business_id: 1,
        category_id:1,
        name:"Electrolit",
        description:"bebida energizante ",
        price:8000,
        create_at: new Date(),
      },
      {
        business_id: 1,
        category_id:2,
        name:"Proteina smart nutrition",
        description:"proteina de las de villa ",
        price:120000,
        create_at: new Date(),
      },
      {
        business_id:1,
        category_id:3,
        name:"Camiseta croosfit",
        description:"camiseta del chino croosfit",
        price:50000,
        create_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
