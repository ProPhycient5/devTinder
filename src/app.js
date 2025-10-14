const express = require('express');
const connectDB = require("./config/db");
const User = require("./model/user")
const app = express();

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Kohli",
        email: "virat14@gmail.com",
        password: "password18"
    }
    //Creating an instance of User model
    const user = new User(userObj);
    try {
        await user.save();
        res.send("User added successfully - POST")
    } catch (err) {
        res.status(400).send("Error while saving: " + err.message)
    }

})

connectDB().then(() => {
    console.log("Connection cannot be established.");
    app.listen("3000", () => {
        console.log("Server has started successfully")
    })
}).catch((err) => {
    console.error("Connection cannot be established", err)
})





