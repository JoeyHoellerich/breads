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

// NEW
breads.get("/new", (req, res) => {
    res.render("new");
})

// GET specific bread - 1 bread [url.com/breads/:arrayIndex]
breads.get("/:arrayIndex", (req, res) => {
    // rednder the show page for the specific bread number
    if (Bread[req.params.arrayIndex]){
        res.render("show", {
            bread: Bread[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
    }
    else {
        res.send("404")
    }
})

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray
    })
})


// UPDATE
breads.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})
  

// DELETE
breads.delete("/:indexArray", (req, res) => {
    Bread.splice(req.params.indexArray, 1);
    res.status(303).redirect("/breads");
})

// export module
module.exports = breads;

