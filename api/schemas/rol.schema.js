const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();

const createRolSchema = Joi.object({
  name: name.required(),
});

const updateRolSchema = Joi.object({
  name: name,
});

const getRolSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRolSchema, updateRolSchema, getRolSchema };
