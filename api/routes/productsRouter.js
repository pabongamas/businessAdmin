const express = require("express");
const ProductService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');


const {
    createProductSchema,getProductSchema,updateProductSchema
   } = require("./../schemas/product.schema");

const router = express.Router();
const service = new ProductService();

router.get("/", async (req, res, next) => {
    try {
        const products = await service.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get("/searchProduct", async (req, res, next) => {
    try {
        const { search } = req.query;
        const categories = await service.search(search);
        res.json(categories);
    } catch (error) {
        next(error);
    }
});
router.post('/',
  validatorHandler(createProductSchema, 'body'),
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

router.patch('/:product_id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const body = req.body;
      const product = await service.update(product_id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:product_id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { product_id } = req.params;
      await service.delete(product_id);
      res.status(201).json({product_id});
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;