const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
    authorId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    exercisesIds: {
        type: Array,
        required: true
    },
    trainingDays: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Training = mongoose.model("trainings", TrainingSchema);