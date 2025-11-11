const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");

const msgObj = {
    interested: "is interested in",
    ignored: "ignored"
}

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //check for valid status
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status")
        }
        //check for valid toUserId
        const isValidToUserId = await User.findById(toUserId);
        if (!isValidToUserId) {
            throw new Error("User not found")
        }
        //check if the connection is already existed
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }]
        })

        if (existingConnectionRequest) {
            throw new Error("Connection request is already existed")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        const message = `${req.user.firstName} ${msgObj[status]} ${isValidToUserId.firstName}`
        const data = await connectionRequest.save();
        res.json({ message, data })
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const { status, requestId } = req.params;
        const loggedInUser = req.user;
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!" })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found" })
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ message: "connection request " + status, data })

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

module.exports = requestRouter;