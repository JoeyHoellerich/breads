// create contoller for breads
const breads = require("express").Router();

// INDEX - JSON data with all bread info
const Bread = require("../models/bread.js")

// GET /breads - all breads [url.com/breads]
breads.get("/", (req, res) => {
  Bread.find()
    .then(foundBreads => {
      // render /views/index.jsx, send it object with attribute "breads", with data from Bread 
      res.render("index", {
        // takes data from Bread model and puts it in the page
        breads: foundBreads,
        title: "Index Page"
      })

    })
})

// NEW
breads.get("/new", (req, res) => {
    res.render("new");
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray
    })
})

// GET specific bread - 1 bread [url.com/breads/:arrayIndex]
breads.get("/:arrayIndex", (req, res) => {
  // look in database and find the bread with the corresponding arrayIndex
  Bread.findById(req.params.arrayIndex)
    .then(foundBread => {
      res.render("show", {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send("404")
    })
})

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      // if no image file is linked, leave it as undefined, the Schema will set it for us
      req.body.image = undefined
    }
    // convert checkbox values to boolean
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    // instead of pushing the created data to an array, instead create it as a new document in DB
    Bread.create(req.body)
    res.redirect('/breads')
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

