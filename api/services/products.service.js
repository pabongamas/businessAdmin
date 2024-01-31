const { models } = require("./../libs/sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class ProductService {
    constructor() { }
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
}

module.exports = ProductService;