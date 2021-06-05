const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddTrainingInput(data) {
    let errors = {};

    data.authorId = !isEmpty(data.authorId) ? data.authorId : "";
    data.name = !isEmpty(data.name) ? data.name : "";

    if (Validator.isEmpty(data.authorId)) {
        errors.authorId = "Author is required";
    } else if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};