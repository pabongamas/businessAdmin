const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
class UsersService {
  constructor() {}
  async find() {
    const rta = await models.User.findAll({
      attributes: ["id", "email"],
      include: [
        {
          association: "roles",
          through: { attributes: [] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["id", "name"], // Lista de campos que deseas incluir en el resultado
        },
        {
          association: "BusinessxUser",
          through: { attributes: ["role_id", "user_id"] },
          attributes: ["id", "name"],
        },
      ],
    });
    return rta;
  }
  async search(data) {
    const rta = await models.User.findAll({
      where: {
        email: {
          [Op.iLike]: `%${data}%`,
        },
      },
      attributes: ["id", "email"],
      include: [
        {
          association: "roles",
          through: { attributes: [] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["id", "name"], // Lista de campos que deseas incluir en el resultado
        },
        {
          association: "BusinessxUser",
          through: { attributes: ["role_id", "user_id"] },
          attributes: ["id", "name"],
        },
      ],
    });
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }
  async findByEmail(email) {
    const user = await models.User.findOne({ where: { email: email } });
    return user;
  }

  async create(data) {
    const existUserByEmail = await this.findByEmail(data.email);
    if (existUserByEmail !== null) {
      throw boom.conflict("Ya existe un usuario con este Email");
    }
    const hash = await bcrypt.hash(data.password, 10);
    try {
      const newUser = await models.User.create({
        ...data,
        password: hash,
      });
      //quitar password del usuario creado al retornanr la informacion al frontend
      delete newUser.dataValues.password;
      return newUser;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async update(id, changes) {
    const existUserByEmail = await this.findByEmail(changes.email);
    if (
      existUserByEmail !== null &&
      parseInt(existUserByEmail.dataValues.id) !== parseInt(id)
    ) {
      throw boom.conflict("Ya existe un usuario con este Email");
    }
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    delete rta.dataValues.password;
    return rta;
  }
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
  async setRol(data) {
    const newRolUser = await models.UserRole.create({
      idUser: data.userId,
      idRole: data.rolId
    });
    return newRolUser;
  }
  async unSetRol(data) {
    const newRolUser = await models.UserRole.destroy({
      where: {
        idUser: data.userId,
        idRole: data.rolId
      }
    });
    return data;
  }
  async setBusinessRolToUser(data){
    const newBusinessRolToUser = await models.UserBusinessRole.create({
      idUser: data.userId,
      idRole: data.rolId,
      idBusiness:data.businessId
    });
    return newBusinessRolToUser;
  }
  async unsetBusinessRolToUser(data) {
    const newRolUser = await models.UserBusinessRole.destroy({
      where: {
        idUser: data.userId,
        idRole: data.rolId,
        idBusiness:data.businessId
      }
    });
    return data;
  }
  async searchRoleAndBusinessByUser(data) {
    const rta = await models.User.findAll({
      where: {
        id: { [Op.eq]: data.id }
      },
      attributes: ["id", "email"],
      include: [
        {
          association: "roles",
          through: { attributes: [] }, // este no muestra los campos redundantemente en las relaciones tomany o mamy to many
          attributes: ["id", "name"], // Lista de campos que deseas incluir en el resultado
        },
        {
          association: "BusinessxUser",
          through: { attributes: ["role_id", "user_id"] },
          attributes: ["id", "name"],
        },
      ],
    });
    return rta;
  }

}

module.exports = UsersService;
