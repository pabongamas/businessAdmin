const Joi = require('joi');

const product_id = Joi.number().integer();
const business_id = Joi.number().integer();
const category_id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const image = Joi.string();
const price= Joi.number().precision(2);

const createProductSchema = Joi.object({
    business_id: business_id.required(),
    category_id: category_id.required(),
    name: name.required(),
    description: description,
    image: image,
    price:price.required(),
});

const updateProductSchema = Joi.object({
    name: name.required(),
    description: description,
    image: image,
    price:price.required(),
    business_id: business_id.required(),
    category_id: category_id.required(),
});

const getProductSchema = Joi.object({
    product_id: product_id.required(),
});
// const findCategorieSchema = Joi.object({
//     name: name.required(),
// });

module.exports = { createProductSchema,getProductSchema,updateProductSchema}

