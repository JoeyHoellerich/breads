// include .env file global variables - PORT
require("dotenv").config();
const PORT = process.env.PORT;

// declare express
const express = require("express");
// instantiate express
const app = express();

// MIDDLEWARE
app.use(express.static("public"))
// set up 'view' setting to be the filepath to view - this is where we will render from
app.set("views", __dirname + "/views");
// set up the 'view engine' to be jsx
app.set("view engine", "jsx");
// create an engine in JSX
app.engine("jsx", require("express-react-views").createEngine());
// when you post data to server its encoded, and it changes data to ASCII values, loses JSON braces
// any data coming in on a post is going to be encoded this way, and it tells the server to reformat the data so your req.body is back in JSON data
app.use(express.urlencoded({extended: true}));

// Home Page
app.get("/", (req, res) => {
    res.send("This is our awesome app about breads!")
})

// breads contoller
const breadController = require("./controllers/bread_controller.js")
// use bread controller under /breads
app.use("/breads", breadController);

// error 404
app.get("*", (req, res) => {
    res.send("404");
})

// start app and listen
app.listen(PORT, (req, res) => {
    console.log("I am awake", PORT);
})