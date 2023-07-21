const Committee = require("../Models/Committee");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const cloudinaryconfig = require('../config/cloudinary');

const createCommittee = async (req, res) => {
  try {
    const { name, designation, role, sessionId } = req.body;
    const files = req.files.image;
    

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json("No file were uploaded");
    }


      const result = await cloudinary.uploader.upload(files.tempFilePath,{folder:"committee"});

      const newCommittee = new Committee({
        name,
        designation,
        role,
        sessionId,
        image: result.url,
        cloudinaryid: result.public_id,
      });
      newCommittee.save();
      removeTmp(files.tempFilePath);

      res.send(newCommittee);
   
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};


const getCommitteeMembers = async (req,res)=> {
  try {
    const {sessionId} = req.params;
    const getCommittees = await Committee.find({sessionId}).populate('sessionId');
    res.status(200).json(getCommittees);
  } catch (error) {
    res.status(400).json(error);
  }
}


exports.createCommittee = createCommittee;
exports.getCommitteeMembers = getCommitteeMembers;