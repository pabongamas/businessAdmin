const express = require("express");
const ProductService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');

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
module.exports = router;