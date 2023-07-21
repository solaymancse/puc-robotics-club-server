const mongoose = require('mongoose');

const CommitteeSchema = new mongoose.Schema({
    image:{
        type: String,
       
    },
    name:{
        type: String,
       
    },
    role:{
        type: String,
       
    },
    designation:{
        type: String,
        default:null,
       
    },
    sessionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Session'
    },
    cloudinaryid:{
        type: String,
       
    }
},{timestamps:true});

const Committee = mongoose.model('Committee', CommitteeSchema);

module.exports = Committee;