const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validations");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (err) {
        res.status(400).send("Error while fetching profile : " + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!validateEditProfileData(req))
            throw new Error("Invalid editable fields")

        Object.keys(req.body).forEach((key) => { loggedInUser[key] = req.body[key] })
        await loggedInUser.save()

        res.json({ message: `${loggedInUser.firstName}, your profile updated succesfully`, updatedProfile: loggedInUser })
    } catch (err) {
        res.status(400).send("Error while updating the profile : " + err.message)
    }
})

//change password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { newPassword } = req.body;
        //compare two passwords are different
        const passwordHash = loggedInUser.password;
        const isSamePassword = await bcrypt.compare(newPassword, passwordHash);
        if (isSamePassword) {
            throw new Error("Create a different password than existing one");
        }
        //check for strong password for new password
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Create a strong password");
        }
        //update the new password
        loggedInUser.password = await bcrypt.hash(newPassword, 10);
        await loggedInUser.save();
        res.send("Password is updated")
    } catch (err) {
        res.status(400).send(`Error while changing the password : ${err.message}`)
    }
})

module.exports = profileRouter;
