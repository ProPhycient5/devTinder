const jwt = require("jsonwebtoken");
const User = require("../model/user")

const userAuth = async (req, res, next) => {
    //read toke from cookies
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid")
        }

        const decodedObj = await jwt.verify(token, "DEVTINDER@58");
        const { _id } = decodedObj;
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found")
        }
        req.user = user;
        next()
    }
    catch (err) {
        res.status(404).send("Error:" + err.message)
    }
}

module.exports = {
    userAuth
}