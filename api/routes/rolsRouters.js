const express = require("express");
const RolsService = require('./../services/roles.service');
const validatorHandler = require("./../middlewares/validator.handler");
const {
  updateRolSchema,
  createRolSchema,
  getRolSchema,
} = require("./../schemas/rol.schema");

const router = express.Router();
const service = new RolsService();

router.get("/", async (req, res, next) => {
  try {
    const roles = await service.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});
router.get("/searchRol", async (req, res, next) => {
  try {
    const { search } = req.query;
    const users = await service.search(search);
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  validatorHandler(createRolSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getRolSchema, "params"),
  validatorHandler(updateRolSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getRolSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);


module.exports=router;
