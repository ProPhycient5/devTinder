const express = require('express');
const connectDB = require("./config/db");
const User = require("./model/user")
const app = express();

app.use(express.json())                 //middleware to convert JSON data into JS object

app.post("/signup", async (req, res) => {
    const ALLOWED_SIGNUP_FIELDS = ["firstName", "lastName", "email", "password",
        "photoUrl", "bio", "gender", "age", "skills"
    ]
    const data = req.body;
    console.log(req.body)
    //Creating an instance of the User model
    const user = new User(req.body);
    try {
        const isAllowedFields = Object.keys(data).every((k) => ALLOWED_SIGNUP_FIELDS.includes(k))
        if (!isAllowedFields) {
            throw new Error("Sign up not allowed")
        }
        if (data?.skills?.length > 10) {
            throw new Error("Skills should be under 10")
        }
        await user.save();
        res.send("User added successfully - POST")
    } catch (err) {
        res.status(400).send("Error while saving: " + err.message)
    }

})

//get a single user from email
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await User.find({ email: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(400).send("Some error occured", + err.message)
    }

})

//get all users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (err) {
        res.status(400).send("something went wrong" + err.message)
    }
})

//get user by id
app.get("/userById", async (req, res) => {
    const userId = req.body.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send("User not found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Some error occured" + err.message)
    }

})

//delete the user by id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully")
    } catch (err) {
        res.status(400).send("Something went wrong" + err.message)
    }
})

//update the user by id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    console.log(data)
    const ALLOWED_UPDATES = [
        "photoUrl", "bio", "gender", "age", "skills", "email"
    ]
    try {
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if (data?.skills?.length > 10) {
            throw new Error("Skills should be under 10")
        }
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: "before", runValidators: true });
        console.log(user)
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message)
    }
})

connectDB().then(() => {
    console.log("Connection cannot be established.");
    app.listen("3000", () => {
        console.log("Server has started successfully")
    })
}).catch((err) => {
    console.error("Connection cannot be established" + err.message)
})





