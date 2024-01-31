const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class ProductService {
    constructor() { }
    async findOne(product_id) {
        const product = await models.Product.findByPk(product_id);
        if (!product) {
            throw boom.notFound("Producto no encontrado");
        }
        return product;
    }
    async find() {
        const rta = await models.Product.findAll({
            attributes: ['id', 'business_id', 'category_id', 'name', 'description', 'image', 'price', 'create_at'],
            include: [{
                model: models.Categories,
                attributes: ['name'], // Puedes seleccionar las columnas que desees de la tabla de categorías
                as: 'category' // Alias para la relación, para que la información de la categoría esté bajo la propiedad 'category'
            },
            {
                model: models.Business,
                attributes: ['name'], // Puedes seleccionar las columnas que desees de la tabla de Business
                as: 'business' // Alias para la relación, para que la información de la Business esté bajo la propiedad 'business'
            }
            ],
            order: [['name', 'ASC']]
        });
        return rta;
    }
    async search(data) {
        const rta = await models.Product.findAll({
            // aca aplico para buscar por medio del name del producto , o por las llaves foraneas category y business , en este maneja un 
            // operador or , donde se indica en un array de objetos estas copndiciones
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${data}%`,
                        }
                    },
                    {
                        '$category.name$': {
                            [Op.iLike]: `%${data}%`,
                        }
                    },
                    {
                        '$business.name$': {
                            [Op.iLike]: `%${data}%`,
                        }
                    }
                ]

            },
            order: [['name', 'ASC']],
            // listo los propios campos de la tabla products
            attributes: ['id', 'business_id', 'category_id', 'name', 'description', 'image', 'price', 'create_at'],
            // incluyo las relaciones foraneas y como quiero mostrar la info y que campos 
            include: [{
                model: models.Categories,
                attributes: ['name'],
                as: 'category'
            },
            {
                model: models.Business,
                attributes: ['name'],
                as: 'business'
            }
            ]
        });
        return rta;
    }
    async create(data) {
        // const existCategorieByName = await this.findByCategorie(data.name);
        // if (existCategorieByName !== null) {
        //   throw boom.conflict("Ya existe una categoria con este Nombre");
        // }
        const { category_id, ...restChanges } = data;
        const updatedChanges = { ...restChanges, categoryId: category_id };
        try {
          const newProduct = await models.Product.create({
            ...updatedChanges
          });
          return newProduct;
        } catch (error) {
          throw boom.badRequest(error);
        }
      }
    async update(id, changes) {
        const product = await this.findOne(id);
        // Utilizando desestructuración para asignar category_id a categoryId
        const { category_id, ...restChanges } = changes;
        const updatedChanges = { ...restChanges, categoryId: category_id };
        const rta = await product.update(updatedChanges);
        return rta;
    }
    async delete(id) {
        const product = await this.findOne(id);
        await product.destroy();
        return { id };
    }
}

module.exports = ProductService;