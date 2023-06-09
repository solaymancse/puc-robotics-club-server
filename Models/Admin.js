const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Can't be Blank"],
    },
    password:{
        type: String,
        required: [true, "Can't be blank"],
    }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;