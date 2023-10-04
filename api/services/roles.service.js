const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');
class RolsService {
  constructor() {
 
  }
  async find() {
    const rta = await models.Role.findAll({
        include:['users'],
          attributes: ['id','name'], // Lista de campos que deseas incluir en el resultado
    });
    return rta;
  }

}

module.exports = RolsService;
