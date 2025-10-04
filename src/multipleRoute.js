const express = require('express');

const app = express();

app.use("/user",
    [(req, res, next) => {
        console.log("Hello route 1");
        // res.send("Hello route 1");
        next();
    },
    (req, res, next) => {
        console.log("Hello route 2");
        next();
        res.send("Hello route 2");
    }],
    (req, res, next) => {
        console.log("Hello route 3");
        // res.send("Hello route 3");
        //   next();
    }
)

app.listen("3000", () => {
    console.log("Server has started successfully")
})