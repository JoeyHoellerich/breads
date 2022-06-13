// define express (gotta render those views)
const express = require('express')
// create a new router to define routes to take
const baker = express.Router()
// grab the model that is defined in the "baker.js" file
const Baker = require('../models/baker.js')

// grab the seed data from the "baker_seed.js"
const bakerSeedData = require('../models/baker_seed.js')

// when you go this link, insert the new data from the seed data into the database
baker.get("/data/seed", (req, res) => {
    Baker.insertMany(bakerSeedData)
    // then redirect to main page
        .then(res.redirect("/breads"))
})

// export the router 
module.exports = baker                    
