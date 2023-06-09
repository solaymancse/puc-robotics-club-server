const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    studentId: {
      type: String,
      unique: true,
    },
    department: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    bloodGrp: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
    paid: {
      type: Boolean,
      default:0,
    },
    cloudinaryId: {
      type: String,
    },
  },
  { timestamps: true }
);
const member = mongoose.model("Member", membersSchema);

module.exports = member;
