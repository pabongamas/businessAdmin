const Joi = require('joi');

const category_id = Joi.number().integer();
const name = Joi.string();
const image = Joi.string();



const createCategorieSchema = Joi.object({
    name: name.required(),
});

const updateCategorieSchema = Joi.object({
    name: name
});

const getCategorieSchema = Joi.object({
    category_id: category_id.required(),
});
const findCategorieSchema = Joi.object({
    name: name.required(),
});

module.exports = { createCategorieSchema, updateCategorieSchema, getCategorieSchema, findCategorieSchema}