const express = require("express");
const router = express.Router();

const TrainingDay = require("../../models/TrainingDay");

// @route GET api/training-days
// @desc Get training days list
// @access Public
router.get("/", (req, res) => {
    TrainingDay.find().then(trainingDays => {
        res.send(trainingDays);
    })
});

// @route GET api/training-days/details/:id
// @desc Get training day details
// @access Public
router.get("/details/:id", (req, res) => {
    TrainingDay.findOne({_id: req.params.id}).then(trainingDay => {
        res.send(trainingDay);
    })
});

// @route GET api/trainings/last
// @desc Get last training details
// @access Public
router.get("/last", (req, res) => {
    TrainingDay.find().sort({date: -1}).then(trainingDays => {
        res.send(trainingDays[0]);
    })
});

// @route POST api/training-days/add
// @desc Add training day
// @access Public
router.post("/add", (req, res) => {
    const newTrainingDay = new TrainingDay({
        authorId: req.body.authorId,
        duration: req.body.duration,
        caloriesBurned: req.body.caloriesBurned,
        trainingName: req.body.trainingName
    });

    newTrainingDay
        .save()
        .then(training => {
            res.json({
                success: true,
                training: training
            });
        })
        .catch(err => console.log(err));
});

// @route POST api/training-days/delete/:id
// @desc Delete training day
// @access Public
router.delete("/delete/:id", (req, res) => {
    TrainingDay.remove({_id: req.params.id})
        .then(training => res.send(training))
        .catch(err => console.log(err));
});

module.exports = router;