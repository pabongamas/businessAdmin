const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');
const { Op } = require("sequelize");
class RolsService {
  constructor() {}
  async find() {
    const rta = await models.Role.findAll({
      include: [
        {
          association: "users",
          through: { attributes: [] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["id", "email"], // Lista de campos que deseas incluir en el resultado
        },
      ],
      order: [["id", "ASC"]],
    });
    return rta;
  }
  async search(data) {
    const rta = await models.Role.findAll({
      where: {
        name: {
          [Op.iLike]: `%${data}%`,
        },
      },
      include: [
        {
          association: "users",
          through: { attributes: [] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["id", "email"], // Lista de campos que deseas incluir en el resultado
        },
      ],
      order: [["id", "ASC"]],
    });
    return rta;
  }
  async findOne(id) {
    const rol = await models.Role.findByPk(id);
    if (!rol) {
      throw boom.notFound("Rol no encontrado");
    }
    return rol;
  }

  async findByName(name) {
    const rol = await models.Role.findOne({ where: { name: name } });
    return rol;
  }

  async create(data) {
    const existRolByName = await this.findByName(data.name);
    if (existRolByName !== null) {
      throw boom.conflict("Ya existe un Rol con este Nombre");
    }
    try {
      const newRol = await models.Role.create(data);
      return newRol;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }
  async update(id, changes) {
    const existRolByName = await this.findByName(changes.name);
    if (
      existRolByName !== null &&
      parseInt(existRolByName.dataValues.id) !== parseInt(id)
    ) {
      throw boom.conflict("Ya existe un Rol con este Nombre");
    }
    const rol = await this.findOne(id);
    const rta = await rol.update(changes);
    return rta;
  }
  async delete(id) {
    const rol = await this.findOne(id);
    await rol.destroy();
    return { id };
  }
}

module.exports = RolsService;
