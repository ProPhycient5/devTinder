const express = require('express');

const app = express();

// app.use("/",(req, res) => {
//     res.send("Hello from default server")             //server requestor
// });

app.get("/user", (req, res) => {
    res.send("Fetched user")             
});

app.post("/user", (req, res) => {
    res.send({ name: "Sawan", gender: "MALE" })           
});

app.delete("/user", (req, res) => {
    res.send("Deleted succussfully");          
});

app.put("/user", (req, res) => {
    res.send("Updated successfully");      
});

app.use("/test/3", (req, res) => {
    res.send("Hello from 3")            
});

app.use("/dashboard", (req, res) => {
    res.send("Hello from dashboard")             //server requestor
});

app.listen("3000", () => {
    console.log("Server has started successfully")
})

