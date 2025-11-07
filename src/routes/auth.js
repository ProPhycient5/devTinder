const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const { userAuth } = require("../middlewares/auth")


authRouter.post("/signup", async (req, res) => {
    try {
        //validation 
        validateSignUpData(req);

        //encrypt password
        const { firstName, lastName, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating an instance of the User model
        const user = new User({
            firstName, lastName, email, password: passwordHash
        });
        await user.save();
        res.send("User added successfully - SignUp")
    } catch (err) {
        res.status(400).send("Error while signing up : " + err.message)
    }

})


authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid credential")
        }
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            //Create JWT token
            const token = await user.getJWT()
            //Add the token to cookies and send the response to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true })  //expires in 8hrs
            res.send("Login successful")
        } else {
            throw new Error("Invalid credential")
        }

    } catch (err) {
        res.status(400).send("Error while login : " + err.message)
    }
})

authRouter.post("/logout", async(req, res) => {
  res.cookie("token", null, {expires: new Date(Date.now())} );
  res.send("Logout successfully")
})


module.exports = authRouter;