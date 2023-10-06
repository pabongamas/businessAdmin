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
          through: { attributes: ["role_id", "user_id", "business_id"] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["user_id", "email"], // Lista de campos que deseas incluir en el resultado
        },
      ],
    });
    return rta;
  }
  async findOne(id) {
    const Business = await models.Business.findByPk(id);
    if(!Business){
      throw boom.notFound('Business no encontrado');
    }
    return  Business ;
  }
  async create(data) {
    try {
      const newBusiness = await models.Business.create(data);
      return newBusiness;
    } catch (error) {
      throw boom.conflict(
        `Ha ocurrido el siguiente error creando el business ${data.name} -> ${error.errors[0].message}`
      );
    }
  }
  async update(id, changes) {
    const Business = await this.findOne(id);
    const rta = await Business.update(changes);
    return rta;
  }
}

module.exports = BusinessService;
