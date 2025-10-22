const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address :" + value)
            }
        }
    },
    gender: {
        type: String,
        validate(value) {                             //this works when a new document is created
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender is not valid")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Create a strong password")
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL " + value)
            }
        },
        default: "https://www.kindpng.com/imgv/ioJmwwJ_dummy-profile-image-jpg-hd-png-download/"
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String,
        default: "I am cool and social"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)