const mongoose = require('mongoose');

const prcSchema = new mongoose.Schema({
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

const prc = mongoose.model('PRC', prcSchema);

module.exports = prc;