const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class CategorieService {
    constructor() { }
    async find() {
        const rta = await models.Categories.findAll({
            attributes: ['category_id', 'name','image','create_at']
        });
        return rta;
    }
    async search(data) {
        const rta = await models.Categories.findAll({
          where: {
            name: {
              [Op.iLike]: `%${data}%`,
            },
          },
          attributes: ['category_id', 'name','image','create_at'],
        });
        return rta;
      }
}

module.exports = CategorieService;
