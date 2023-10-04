const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
class BusinessService {
  constructor() {}
  async find() {
    const rta = await models.Business.findAll({
      //   include: ["usersBusiness"],
      include: [
        {
          association: "usersBusiness",
          // through: { attributes: [] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          // attributes: ["id", "email"], // Lista de campos que deseas incluir en el resultado
        },
      ],
    });
    return rta;
  }
}

module.exports = BusinessService;
