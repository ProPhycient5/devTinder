const express = require('express');

const app = express();

app.get("/getUserData", (req, res) => {
    try {
        throw new Error("hcdjssk")
        res.send("User data sent");
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
});

//we keep the following towards the last of the application but safety reason
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong")
    }
})

app.listen("3000", () => {
    console.log("Server has started successfully")
})