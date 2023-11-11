const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const idRol=Joi.number().integer();
const idUser=Joi.number().integer();

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
const deleteBusinessRolByUser=Joi.object({
  businessId: id.required(),
  rolId: idRol.required(),
  userId: idUser.required(),
});

module.exports = {
  createBusinessSchema,
  updateBusinessSchema,
  getBusinessSchema,
  getBusinessByuserSchema,
  deleteBusinessRolByUser
};
