const express = require("express");
const CategorieService = require('./../services/categories.service');
const validatorHandler = require('./../middlewares/validator.handler');

const {
   createCategorieSchema,getCategorieSchema,updateCategorieSchema
  } = require("./../schemas/categorie.schema");

const router = express.Router();
const service = new CategorieService();

router.get("/", async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get("/searchCategorie", async (req, res, next) => {
    try {
        const { search } = req.query;
        const categories = await service.search(search);
        res.json(categories);
    } catch (error) {
        next(error);
    }
});
router.post('/',
  validatorHandler(createCategorieSchema, 'body'),
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

router.patch('/:category_id',
  validatorHandler(getCategorieSchema, 'params'),
  validatorHandler(updateCategorieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { category_id } = req.params;
      const body = req.body;
      const user = await service.update(category_id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:category_id',
  validatorHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { category_id } = req.params;
      await service.delete(category_id);
      res.status(201).json({category_id});
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
