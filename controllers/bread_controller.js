// create contoller for breads
const breads = require("express").Router();

// INDEX - JSON data with all bread info
const Bread = require("../models/bread.js");

const seedData = [
  {
    name: 'Rye',
    hasGluten: true,
    image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'French',
    hasGluten: true,
    image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    name: 'Gluten Free',
    hasGluten: false,
    image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Pumpernickel',
    hasGluten: true,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  }
];


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

// SEED Data
breads.get("/data/seed", (req, res) => {
  Bread.insertMany(seedData)
    .then(createdBreads => {
      res.redirect("/breads")
    })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id) 
    .then(foundBread => { 
      res.render('edit', {
        bread: foundBread 
      })
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
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedBread => {
        console.log(updatedBread)
        res.redirect(`/breads/${req.params.id}`)
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

