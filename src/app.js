const express = require('express');

const app = express();

app.use("/",(req, res) => {
    res.send("Hello from default server")             //server requestor
});

app.use("/test",(req, res) => {
    res.send("Hello from test server")             //server requestor
});

app.use("/dashboard",(req, res) => {
    res.send("Hello from dashboard")             //server requestor
});

app.listen("3000", () => {
    console.log("Server has started successfully")
})

