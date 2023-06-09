const gallary = require('../Models/Gallary');
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

const uploadPhoto = async(req, res)=> {
    try {
    const {title} = req.body;
    const file = req.files.image;

    if(!file || Object.keys(file).length === 0){
        return res.status(400).send("No File Were uploaded.");
    }
    // upload cloudinary
    cloudinary.uploader.upload(file.tempFilePath,{folder:"gallary"},(err, result)=>{
        if (err) throw err;
        removeTmp(file.tempFilePath);

        const savedGallary = new gallary({
            title,
            image: result.url,
            cloudinaryid: result.public_id,
        })

        savedGallary.save();
        res.status(200).json(savedGallary);
    })
    } catch (error) {
        res.status(400).json(error);
    }

}
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };

  // get all photos
  const getAllPhotos = async(req,res)=>{
    try {
        const photos = await gallary.find().sort({ $natural: -1});
        res.status(200).json(photos);
    } catch (error) {
        res.status(400).json(error);
    }

  }
  // get limit photos
  const getLimitPhotos = async(req,res)=>{
    try {
        const photos = await gallary.find().sort({ $natural: -1}).limit(6);
        res.status(200).json(photos);
    } catch (error) {
        res.status(400).json(error);
    }

  }

  // delete photos

  const deletePhotos = async(req, res)=> {
    try {
        const photo = await gallary.findById(req.params.id);
        const imgLink = photo.cloudinaryid;
        if (photo) {
          try {
            cloudinary.uploader.destroy(imgLink, async (err, result) => {
              if (err) throw err;
              await photo.delete();
              res.status(200).json({msg:"successfull",result});
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
  }

exports.uploadPhoto = uploadPhoto;
exports.getAllPhotos = getAllPhotos;
exports.getLimitPhotos = getLimitPhotos;
exports.deletePhotos = deletePhotos;