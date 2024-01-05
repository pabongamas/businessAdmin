const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class CategorieService {
  constructor() { }
  async find() {
    const rta = await models.Categories.findAll({
      attributes: ['category_id', 'name', 'image', 'create_at']
    });
    return rta;
  }
  async findOne(category_id) {
    console.log(category_id);
    const categorie = await models.Categories.findByPk(category_id);
    if (!categorie) {
      throw boom.notFound("Categoria no encontrada");
    }
    return categorie;
  }
  async search(data) {
    const rta = await models.Categories.findAll({
      where: {
        name: {
          [Op.iLike]: `%${data}%`,
        },
      },
      attributes: ['category_id', 'name', 'image', 'create_at'],
    });
    return rta;
  }

  async create(data) {
    const existCategorieByName = await this.findByCategorie(data.name);
    if (existCategorieByName !== null) {
      throw boom.conflict("Ya existe una categoria con este Nombre");
    }
    try {
      const newCategorie = await models.Categories.create({
        ...data
      });
      return newCategorie;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async findByCategorie(name) {
    const categorie = await models.Categories.findOne({ where: { name: name } });
    return categorie;
  }

  
  async update(id, changes) {
    const existCategorieByName = await this.findByCategorie(changes.name);
    if (
      existCategorieByName !== null &&
      parseInt(existCategorieByName.dataValues.id) !== parseInt(id)
    ) {
      throw boom.conflict("Ya existe una categoria con este Nombre");
    }
    console.log(id);
    const categorie = await this.findOne(id);
    const rta = await categorie.update(changes);
    return rta;
  }
}

module.exports = CategorieService;
