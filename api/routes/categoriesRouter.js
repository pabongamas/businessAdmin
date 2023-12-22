const express = require("express");
const CategorieService = require('./../services/categories.service');

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



module.exports = router;
