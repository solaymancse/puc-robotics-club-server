const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const SessionSchema = new mongoose.Schema({
    year:{
        type: String,
        required: true,
        unique: true,
    }

},{timestamps:true});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;