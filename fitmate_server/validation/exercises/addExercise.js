const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddExerciseInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.categoriesIds = !isEmpty(data.categoriesIds) ? data.categoriesIds : [];

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    // else if (Validator.isEmpty(data.categoriesIds)) {
    //     errors.categoriesIds = "Categories are required";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};