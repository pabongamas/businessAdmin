const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const userService = require('./../services/users.service');

const serviceUser = new userService();

class CategorieService {
  constructor() { }
  async find() {
    const rta = await models.Categories.findAll({
      attributes: ['category_id', 'name', 'image', 'create_at']
    });
    return rta;
  }
  async findOne(category_id) {
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
  async categoriessByBusiness(data) {
    var business;
    var businessId = [];
    const roleBusinessByUser = await serviceUser.searchRoleAndBusinessByUser(data);
    if (roleBusinessByUser.length > 0) {
      var business = roleBusinessByUser[0].BusinessxUser;
      business.forEach(element => {
        businessId.push(element.id);
      });
    }
    const rta = await models.Categories.findAll({
      where: {
        businessId: {
          [Op.in]:businessId,
        },
      },
      attributes: ['category_id', 'name', 'image', 'create_at'],
    });
    return rta;
  }

  async create(data,userRole) {
    userRole.id=userRole.sub;
    var business;
    var businessId=[];
    const roleBusinessByUser=await serviceUser.searchRoleAndBusinessByUser(userRole);
    if(roleBusinessByUser.length>0){
       var business= roleBusinessByUser[0].BusinessxUser;
       business.forEach(element => {
        businessId.push(element.id);
       });
    }
    const existCategorieByName = await this.findByCategorie(data.name);
    if (existCategorieByName !== null) {
      throw boom.conflict("Ya existe una categoria con este Nombre");
    }
    try {
      const newCategorie = await models.Categories.create({
        ...data,
        businessId:businessId[0]
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
    const categorie = await this.findOne(id);
    const rta = await categorie.update(changes);
    return rta;
  }
  async delete(id) {
    const productsByCategorie=await models.Product.findAll({
      where:{
        category_id:id
      }
    });
   if(productsByCategorie.length>0){
    throw boom.conflict("Esta categoria esta siendo utilizada , no se puede eliminar");
   }
    const categorie = await this.findOne(id);
    await categorie.destroy();
    return { id };
  }
}

module.exports = CategorieService;
