const express = require('express');

const app = express();

const authFunc = (req, res, next) => {
    console.log("authentication is checked")
    const token = "xyz";
    if (token === "xyz"){
        next();
    }else{
        res.status(401).send("Forbidden authorization")
    }
}

app.use("/admin",authFunc);

app.get("/admin/getAllData", (req, res) => {
    res.send("All data is sent")
});

app.get("/admin/deleteAdmin", (req, res) => {
    res.send("Admin is deleted");
});

app.get("/user", (req, res) => {
    res.send("Sent for user");
})


app.listen("3000", () => {
    console.log("Server has started successfully")
})