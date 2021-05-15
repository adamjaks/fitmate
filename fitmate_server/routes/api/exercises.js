const express = require("express");
const router = express.Router();

const validateAddExerciseInput = require("../../validation/exercises/addExercise");

const Exercise = require("../../models/Exercise");

// @route GET api/exercises
// @desc Get exercise list
// @access Public
router.get("/", (req, res) => {
    Exercise.find().then(exercises => {
        res.send(exercises);
    })
});

// @route POST api/exercises/add
// @desc Add exercise
// @access Public
router.post("/add", (req, res) => {

    const { errors, isValid } = validateAddExerciseInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newExercise = new Exercise({
        name: req.body.name,
        description: req.body.description,
        categoriesIds: req.body.categoriesIds
    });

    newExercise
        .save()
        .then(exercise => {
            res.json({
                success: true,
                exercise: exercise
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;