const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Can't blank"],
    },
    desc:{
        type:String,
        required:[true,"Can't blank"],
    }
},{timestamps:true});

const Notice = mongoose.model("notice",noticeSchema);

module.exports = Notice;