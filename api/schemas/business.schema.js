const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createBusinessSchema = Joi.object({
  name: name.required(),
});
const updateBusinessSchema = Joi.object({
  name: name.required(),
});

const getBusinessSchema = Joi.object({
  id: id.required(),
});
const getBusinessByuserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createBusinessSchema,
  updateBusinessSchema,
  getBusinessSchema,
  getBusinessByuserSchema
};
