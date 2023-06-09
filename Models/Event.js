const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    eventDate:{
        type:Date,
        required: true,
    },
    image:{
       type: String,
       required: true,
       
    },
    cloudinaryid:{
       type: String,
       
    },

   
}, {timestamps:true});

module.exports = mongoose.model("Event", eventSchema);

