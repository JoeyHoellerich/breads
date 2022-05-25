// create contoller for breads
const breads = require("express").Router();

// INDEX - get list of bread (from JSON data)
const Bread = require("../models/bread.js")

// GET /breads
breads.get("/", (req, res) => {
    res.send(Bread);
})

// export module
module.exports = breads;

