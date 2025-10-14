const express = require('express');
const connectDB = require("./config/db");
const User = require("./model/user")
const app = express();

app.use(express.json())                 //middleware to convert JSON data into JS object

app.post("/signup", async (req, res) => {
    console.log(req.body)
    //Creating an instance of the User model
    const user = new User(req.body);
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





