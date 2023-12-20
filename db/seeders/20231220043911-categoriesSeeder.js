'use strict';
const { CATEGORIES_TABLE } = require("./../models/categorieProduct.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(CATEGORIES_TABLE, [
      {
        name: "Bebidas energeticas",
        image:"aca va la imagen",
        create_at: new Date(),
      },
      {
        name: "Proteinas",
        image:"aca va la imagen de la proteina ",
        create_at: new Date(),
      },
      {
        name: "Camisetas",
        image:"aca va la imagen de la camisa",
        create_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(CATEGORIES_TABLE, null, {});
  }
};
