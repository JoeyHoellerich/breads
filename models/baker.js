// use mongoose to create model
const mongoose = require("mongoose");

// get the Breads model for use with the virtual 
const Bread = require("./bread");

// pull the schema class from mongoose package
const { Schema } = mongoose 

// define a new Schema for bakers
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        // Baker's name can only be a Friend
        enum: ["Rachel", "Monica", "Joey", "Chandler", "Ross", "Phoebe"],
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: {
        type: String
    }
}, {toJSON: {virtuals: true}})

// Virtuals
// the virtual field we are adding will be called "breads"
// we want to reference the "Bread" collection
// use the Baker's id to see which breads have that id listed under the field 'baker'
bakerSchema.virtual("breads", {
    ref: "Bread",
    localField: "_id",
    foreignField: "baker"
})


// model the schema, create a new collection in MongoDB for bakers
const Baker = mongoose.model("Baker", bakerSchema);

// export the new model
module.exports = Baker;