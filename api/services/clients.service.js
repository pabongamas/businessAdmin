const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
class ClientsService {
    constructor() {}
    async findByBusiness(business) {
      const businessId=business.map(objeto=>objeto.id);
      const rta = await models.Client.findAll({
        attributes: ['id', 'names', 'lastnames', 'nickname', 'phone', 'gender', 'birthdate', 'address',"createdAt","active"],
        include: [{
            model: models.User,
            attributes: ['email','id'], // Puedes seleccionar las columnas que desees de la tabla de categorías
            as: 'user' // Alias para la relación, para que la información de la categoría esté bajo la propiedad 'category'
        },
        {
            model: models.Business,
            attributes: ['name','id'], // Puedes seleccionar las columnas que desees de la tabla de Business
            as: 'business' // Alias para la relación, para que la información de la Business esté bajo la propiedad 'business'
        }
        ],
        where: {
          business_id: {
            [Op.in]:businessId
          }
        },
        order: [['names', 'ASC']]
      });
      return rta;
    }
}
module.exports = ClientsService;