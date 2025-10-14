const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://dsawanoffice8:78BuczlCtmmflnGk@backenddb.rac4jwd.mongodb.net/devTinder");
}

module.exports = connectDB