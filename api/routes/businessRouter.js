const express = require("express");
const BusinessService = require("./../services/business.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  createBusinessSchema,
  updateBusinessSchema,
  getBusinessSchema,
  getBusinessByuserSchema,
  deleteBusinessRolByUser
} = require("./../schemas/business.schema");

const router = express.Router();
const service = new BusinessService();

router.get("/", async (req, res, next) => {
  try {
    const roles = await service.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});
router.get("/searchBusiness", async (req, res, next) => {
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
  // autenticacionJwt,checkRoles('admin'),
  validatorHandler(createBusinessSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBusiness = await service.create(body);
      res.status(201).json(newBusiness);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  validatorHandler(getBusinessSchema, "params"),
  validatorHandler(updateBusinessSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const business = await service.update(id, body);
      res.json(business);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  validatorHandler(getBusinessSchema, "params"),
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
router.post(
  "/businessByUser",
  validatorHandler(getBusinessByuserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBusiness = await service.businessByUser(body);
      res.status(201).json(newBusiness);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/deleteBusinessRolByUser",
  validatorHandler(deleteBusinessRolByUser, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBusiness = await service.deleteBusinessRolByUser(body);
      res.status(201).json(newBusiness);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
