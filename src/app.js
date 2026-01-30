const express = require('express');
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");
const cors = require("cors")
const app = express();

app.use(express.json());    //middleware to convert JSON data into JS object
app.use(cookieParser());
app.use(cors({
 origin: "http://localhost:5173",
 credentials: true
}));

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("DB connection started...");
    app.listen("3000", () => {
        console.log("Server has started successfully...")
    })
}).catch((err) => {
    console.error("Connection cannot be established" + err.message)
})





