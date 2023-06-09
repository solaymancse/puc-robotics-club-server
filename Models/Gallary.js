const mongoose = require('mongoose');

const gallarySchema = new mongoose.Schema({
    image:{
        type:String,
    },
    title:{
        type:String,
    },
    cloudinaryid:{
        type: String,
    }
},{timestamps:true});

const gallary = mongoose.model('Gallary', gallarySchema);

module.exports = gallary;