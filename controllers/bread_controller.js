// create contoller for breads
const breads = require("express").Router();

// INDEX - JSON data with all bread info
const Bread = require("../models/bread.js")

// GET /breads - all breads [url.com/breads]
breads.get("/", (req, res) => {
    res.send(Bread);
})

// GET specific bread - 1 bread [url.com/breads/:arrayIndex]
breads.get("/:arrayIndex", (req, res) => {
    // whatever the number at the end of the url, get that array index from data and display it
    res.send(Bread[req.params.arrayIndex]);
})

// export module
module.exports = breads;

