const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');
class UsersService {
  constructor() {
 
  }
  async find() {
    const rta = await models.User.findAll({
      // include:['roles']
      include: [
        {
          association:'roles',
          attributes: ['id','name'], // Lista de campos que deseas incluir en el resultado
        },
      ],
    });
    return rta;
  }
  // async findByEmail(email) {
  //   const rta = await models.User.findOne({
  //     where:{email}
  //   });
  //   return rta;
  // }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return  user ;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  // async delete(id) {
  //   const user =  await this.findOne(id);
  //   await user.destroy();
  //   return { id };
  // }
}

module.exports = UsersService;
