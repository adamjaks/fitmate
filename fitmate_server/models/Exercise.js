const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    categoriesIds: {
        type: Array,
        required: false
    }
});

module.exports = Exercise = mongoose.model("exercises", ExerciseSchema);