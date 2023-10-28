const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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
      order: [["id", "ASC"]],
    });
    return rta;
  }
  async search(data) {
    const rta = await models.Business.findAll({
      where: {
        name: {
          [Op.iLike]: `%${data}%`,
        },
      },
      include: [
        {
          association: "userxBusiness",
          through: { attributes: ["role_id", "user_id", "business_id"] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["user_id", "email"], // Lista de campos que deseas incluir en el resultado
        },
      ],
      order: [["id", "ASC"]],
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
  async findByName(name) {
    const business = await models.Business.findOne({ where: { name: name } });
    return business;
  }
  async create(data) {
    const existBusinessByName = await this.findByName(data.name);
    if (existBusinessByName !== null) {
      throw boom.conflict("Ya existe un Negocio con este Nombre");
    }
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
    const existBusinessByName = await this.findByName(changes.name);
    if (
      existBusinessByName !== null &&
      parseInt(existBusinessByName.dataValues.id) !== parseInt(id)
    ) {
      throw boom.conflict("Ya existe un Negocio con este Nombre");
    }
    const Business = await this.findOne(id);
    const rta = await Business.update(changes);
    return rta;
  }
  async delete(id) {
    const rol = await this.findOne(id);
    await rol.destroy();
    return { id };
  }
}

module.exports = BusinessService;
