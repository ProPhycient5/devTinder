const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is invalid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong")
    }
}

const validateEditProfileData = (req) => {
    const editableObj = req.body;
    const allowedFields = ["firstName", "lastName", "email", "gender", "age", "skills", "bio", "photoUrl"];
    const isAllowed = Object.keys(editableObj).every((key) => allowedFields.includes(key));
    return isAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}