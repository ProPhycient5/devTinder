const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");

const userRouter = express.Router();

const SAFE_USER_DATA = "firstName lastName gender age bio skill"

//fetching all the connection request that is in pending(interested) state for the loggedIn user.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const receivedConnectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", SAFE_USER_DATA)

        res.json({ message: "Data fetched successfully", data: receivedConnectionRequests })
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const totalConnections = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id, status: "accepted" }, { toUserId: loggedInUser._id, status: "accepted" }]
        }).populate("fromUserId", SAFE_USER_DATA)
            .populate("toUserId", SAFE_USER_DATA);

        const data = totalConnections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({ data })
    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

module.exports = userRouter