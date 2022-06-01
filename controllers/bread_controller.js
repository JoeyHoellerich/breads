// create contoller for breads
const breads = require("express").Router();

// INDEX - JSON data with all bread info
const Bread = require("../models/bread.js")

// GET /breads - all breads [url.com/breads]
breads.get("/", (req, res) => {
    // render /views/index.jsx, send it object with attribute "breads", with data from Bread 
    res.render("index", 
        {
            breads: Bread,
            title: "Index Page"
        }
    );
})

// GET specific bread - 1 bread [url.com/breads/:arrayIndex]
breads.get("/:arrayIndex", (req, res) => {
    // rednder the show page for the specific bread number
    if (Bread[req.params.arrayIndex]){
        res.render("show", {
            bread: Bread[req.params.arrayIndex]
        })
    }
    else {
        res.send("404")
    }
})

// export module
module.exports = breads;

