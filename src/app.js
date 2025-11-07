const express = require('express');
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");
const app = express();

app.use(express.json());    //middleware to convert JSON data into JS object
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

connectDB().then(() => {
    console.log("Connection cannot be established.");
    app.listen("3000", () => {
        console.log("Server has started successfully")
    })
}).catch((err) => {
    console.error("Connection cannot be established" + err.message)
})





