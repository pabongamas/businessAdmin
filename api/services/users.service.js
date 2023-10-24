const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
class UsersService {
  constructor() {}
  async find() {
    const rta = await models.User.findAll({
      // include:['roles']
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

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    console.log(hash);
    console.log(data);
    try {
      const newUser = await models.User.create({
        ...data,
        password: hash,
      });
      //quitar password del usuario creado al retornanr la informacion al frontend
      delete newUser.dataValues.password;
      return newUser;
    } catch (error) {
      console.log(error);
    }
   
  }
}

module.exports = UsersService;
