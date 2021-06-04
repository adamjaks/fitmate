const express = require("express");
const router = express.Router();

const validateAddCategoryInput = require("../../validation/categories/addCategory");

const Category = require("../../models/Category");

// @route GET api/categories
// @desc Get categories list
// @access Public
router.get("/", (req, res) => {
    Category.find().then(categories => {
        res.send(categories);
    })
});

// @route POST api/categories/add
// @desc Add category
// @access Public
router.post("/add", (req, res) => {

    const { errors, isValid } = validateAddCategoryInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newCategory = new Category({
        name: req.body.name,
    });

    newCategory
        .save()
        .then(exercise => {
            res.json({
                success: true,
                category: newCategory
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;