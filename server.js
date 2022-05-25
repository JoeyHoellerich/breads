// include .env file global variables - PORT
require("dotenv").config();
const PORT = process.env.PORT;

// declare express
const express = require("express");
// instantiate express
const app = express();

// Home Page
app.get("/", (req, res) => {
    res.send("This is our awesome app about breads!")
})

// breads contoller
const breadController = require("./controllers/bread_controller.js")
// use bread controller under /breads
app.use("/breads", breadController);

// start app and listen
app.listen(PORT, (req, res) => {
    console.log("I am awake", PORT);
})