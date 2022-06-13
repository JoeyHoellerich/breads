// use mongoose to create model
const mongoose = require("mongoose");

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
})

// model the schema, create a new collection in MongoDB for bakers
const Baker = mongoose.model("Baker", bakerSchema);

// export the new model
module.exports = Baker;