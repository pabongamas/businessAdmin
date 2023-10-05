const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
class BusinessService {
  constructor() {}
  async find() {
    const rta = await models.Business.findAll({
      // include: 'userxBusiness'
      include: [
        {
          association: "userxBusiness",
          through: { attributes: ["role_id","user_id","business_id"] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["user_id","email"], // Lista de campos que deseas incluir en el resultado
        },
      ],
    });
    return rta;
  }
}

module.exports = BusinessService;
