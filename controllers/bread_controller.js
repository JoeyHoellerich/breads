// create contoller for breads
const breads = require("express").Router();

// INDEX - JSON data with all bread info
const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");


// GET /breads - all breads [url.com/breads]
breads.get('/', async (req, res) => {
  // use .lean to only get the JSON of the items, instead of the whole document (saves time)
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(5).lean()
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})


// NEW
breads.get("/new", (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render("new", {
        bakers: foundBakers
      })
    })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.id)
        .then(foundBread => {
          res.render("edit", {
            bread: foundBread,
            bakers: foundBakers
          })
        })
    })
})

// GET specific bread - 1 bread [url.com/breads/:arrayIndex]
breads.get("/:id", (req, res) => {
  // look in database and find the bread with the corresponding arrayIndex
  Bread.findById(req.params.id)
  // get the full object for "baker" not just the id
    .populate("baker")
    .then(foundBread => {
      res.render("show", {
        bread: foundBread
      })
    })
    .catch(err => {
      res.render("error404")
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
      .then(newBread => {
        res.redirect('/breads')
      })
      .catch(err => {
        res.render("error404")
        console.log(err);
      })
})


// UPDATE
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updatedBread => {
        console.log(updatedBread)
        // if (updatedBread)
        res.redirect(`/breads/${req.params.id}`)
      })
      .catch(err => {
        res.render("error404");
        console.log(err)
      })
})
  

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


// export module
module.exports = breads;

