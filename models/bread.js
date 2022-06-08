// get data from MongoDB
const mongoose = require("mongoose");
// create a new class called Schema
const { Schema } = mongoose;

// create a new object, from the class Schema, with the correct attributes
const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: {type: Boolean},
  image: {type: String, default: "http://placehold.it/500x500.png"}
})

// convert the bread from the database into a new object called "Bread" that we will be able to work with
// get the data from the MongoDB collection: "Bread" 
const Bread = mongoose.model("Bread", breadSchema)

// export our Bread Object
module.exports = Bread