const mongoose = require('mongoose');

const SeminerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Can't blank"],
    },
    desc:{
        type:String,
        required:[true,"Can't blank"],
    },
    image:{
        type:String,
        required:[true,"Can't blank"],
    },
    cloudinaryId:{
        type:String,
    }
},{timestamps:true});

const Seminer = mongoose.model("seminer",SeminerSchema);

module.exports = Seminer;