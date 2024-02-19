const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
class ClientsService {
  constructor() { }
  async findByBusiness(business) {
    const businessId = business.map(objeto => objeto.id);
    const rta = await models.Client.findAll({
      attributes: ['id', 'names', 'lastnames', 'nickname', 'phone', 'gender', 'birthdate', 'address', "createdAt", "active"],
      include: [{
        model: models.User,
        attributes: ['email', 'id'], // Puedes seleccionar las columnas que desees de la tabla de categorías
        as: 'user' // Alias para la relación, para que la información de la categoría esté bajo la propiedad 'category'
      },
      {
        model: models.Business,
        attributes: ['name', 'id'], // Puedes seleccionar las columnas que desees de la tabla de Business
        as: 'business' // Alias para la relación, para que la información de la Business esté bajo la propiedad 'business'
      }
      ],
      where: {
        business_id: {
          [Op.in]: businessId
        }
      },
      order: [['names', 'ASC']]
    });
    return rta;
  }

  async search(data, business) {
    const businessId = business.map(objeto => objeto.id);
    const rta = await models.Client.findAll({
      where: {
        [Op.or]: [
          {
            names: {
              [Op.iLike]: `%${data}%`,
            }
          },
          {
            lastnames: {
              [Op.iLike]: `%${data}%`,
            }
          },
          {
            nickname: {
              [Op.iLike]: `%${data}%`,
            }
          },
          {
            '$user.email$': {
              [Op.iLike]: `%${data}%`,
            }
          }
        ],
        business_id: {
          [Op.in]: businessId
        }

      },
      order: [['names', 'ASC']],
      attributes: ['id', 'names', 'lastnames', 'nickname', 'phone', 'gender', 'birthdate', 'address', "createdAt", "active"],
      include: [{
        model: models.User,
        attributes: ['email', 'id'],
        as: 'user'
      },
      {
        model: models.Business,
        attributes: ['name', 'id'],
        as: 'business'
      }
      ],
    });
    return rta;
  }

  async createClient(data,idUser,business) {
    try {
      
      if(business.lenght===0){
        throw boom.conflict("No se ha encontrado Negocios  para vincular al Nuevo cliente");
      }
      console.log(data);
      const newClient = await models.Client.create({
        ...data,
        user_id: idUser,
        business_id:business[0].id
      });
      //quitar password del usuario creado al retornanr la informacion al frontend
      return newClient;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }
}
module.exports = ClientsService;