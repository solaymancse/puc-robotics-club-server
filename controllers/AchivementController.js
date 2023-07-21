const Achivement = require("../Models/Achivement");
const fs = require("fs");
const cloudinaryconfig = require('../config/cloudinary');
const cloudinary = require("cloudinary").v2;

const createAchivement = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.files.image;

    if (!file || Object.keys(file).length === 0) {
      return res.status(400).send("No File Were uploaded.");
    }
    // upload cloudinary
    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "achivement" },
      (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        const savedAchivement = new Achivement({
          title,
          image: result.url,
          cloudinaryid: result.public_id,
        });

        savedAchivement.save();
        res.status(200).json(savedAchivement);
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

// get all achivement
const getAllAchivement = async (req, res) => {
  try {
    const achivements = await Achivement.find().sort({ $natural: -1 });
    res.status(200).json(achivements);
  } catch (error) {
    res.status(400).json(error);
  }
};
// get limited achivement
const getLimitedAchivement = async (req, res) => {
  try {
    const achivements = await Achivement.find().sort({ $natural: -1 }).limit(6);
    res.status(200).json(achivements);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update photos

const updateAchivement = async (req, res) => {};
// delete photos

const deleteAchivement = async (req, res) => {
  try {
    const achivement = await Achivement.findById(req.params.id);
    const imgLink = achivement.cloudinaryid;
    if (achivement) {
      try {
        cloudinary.uploader.destroy(imgLink, async (err, result) => {
          if (err) throw err;
          await achivement.delete();
          res.status(200).json({ msg: "successfull", result });
        });
      } catch (error) {
        res.status(500).json(error.message);
      }
    } else {
      res.status(401).json("Can't find the post.");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createAchivement = createAchivement;
exports.getAllAchivement = getAllAchivement;
exports.getLimitedAchivement = getLimitedAchivement;
exports.updateAchivement = updateAchivement;
exports.deleteAchivement = deleteAchivement;
