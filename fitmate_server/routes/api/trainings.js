const express = require("express");
const router = express.Router();

const validateAddTrainingInput = require("../../validation/trainings/addTraining");

const Training = require("../../models/Training");

// @route GET api/trainings
// @desc Get training list
// @access Public
router.get("/", (req, res) => {
    Training.find().then(trainings => {
        res.send(trainings);
    })
});

// @route POST api/trainings/add
// @desc Add training
// @access Public
router.post("/add", (req, res) => {
    const { errors, isValid } = validateAddTrainingInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newTraining = new Training({
        authorId: req.body.authorId,
        name: req.body.name,
        exercisesIds: req.body.exercisesIds
    });

    newTraining
        .save()
        .then(training => {
            res.json({
                success: true,
                training: training
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;