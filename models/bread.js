// get data from MongoDB
const mongoose = require("mongoose");
// create a new class called Schema
const { Schema } = mongoose;

// create a new object, from the class Schema, with the correct attributes
const breadSchema = new Schema({
  name: {type: String, required: true},
  hasGluten: {type: Boolean},
  image: {type: String, default: "http://placehold.it/500x500.png"},
  baker: {
    // the baker information comes from the "Baker" Collection
    type: Schema.Types.ObjectId,
    ref: "Baker"
  }
})

breadSchema.methods.getBakedBy = function() {
  if (!this.baker){
    return `${this.name} was baked with love by an unknown baker, who has been with us for an unknown amount of time`
  }
  else{
    return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
  }
}


// convert the bread from the database into a new object called "Bread" that we will be able to work with
// get the data from the MongoDB collection: "Bread" 
const Bread = mongoose.model("Bread", breadSchema)


// export our Bread Object
module.exports = Bread