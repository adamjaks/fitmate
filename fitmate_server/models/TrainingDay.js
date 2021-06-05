const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingDaySchema = new Schema({
    authorId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    duration: {
        type: Number,
        required: false
    },
    caloriesBurned: {
        type: Number,
        required: false
    },
    trainingName: {
        type: String,
        required: true
    }
});

module.exports = TrainingDay = mongoose.model("trainingDays", TrainingDaySchema);