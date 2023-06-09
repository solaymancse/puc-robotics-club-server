const mongoose = require('mongoose');

const achivementSchema = new mongoose.Schema({
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

const achivement = mongoose.model('Achivement', achivementSchema);

module.exports = achivement;