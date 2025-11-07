const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")

requestRouter.post("/sentConnection", userAuth, async (req, res) => {
    try {
        res.send("Connection is sent")

    } catch (err) {
        res.status(400).send("Error while login : " + err.message)
    }
})

module.exports = requestRouter;