const PRC = require('../Models/Prc');
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

const createPrc = async(req, res)=> {
    try {
    const {title} = req.body;
    const file = req.files.image;

    if(!file || Object.keys(file).length === 0){
        return res.status(400).send("No File Were uploaded.");
    }
    // upload cloudinary
    cloudinary.uploader.upload(file.tempFilePath,{folder:"project_research"},(err, result)=>{
        if (err) throw err;
        removeTmp(file.tempFilePath);

        const savedPrc = new PRC({
            title,
            image: result.url,
            cloudinaryid: result.public_id,
        })

        savedPrc.save();
        res.status(200).json(savedPrc);
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

  // get all achivement
  const getAllPrc = async(req,res)=>{
    try {
        const allPrc = await PRC.find().sort({ $natural: -1});
        res.status(200).json(allPrc);
    } catch (error) {
        res.status(400).json(error);
    }

  }
  // get all achivement
  const getLimitPrc = async(req,res)=>{
    try {
        const allPrc = await PRC.find().sort({ $natural: -1}).limit(6);
        res.status(200).json(allPrc);
    } catch (error) {
        res.status(400).json(error);
    }

  }

  // update photos

  const updatePrc = async(req, res)=> {
    
  }
  // delete photos

  const deletePrc= async(req, res)=> {
    try {
        const prc = await PRC.findById(req.params.id);
        const imgLink = prc.cloudinaryid;
        if (prc) {
          try {
            cloudinary.uploader.destroy(imgLink, async (err, result) => {
              if (err) throw err;
              await prc.delete();
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

exports.createPrc = createPrc;
exports.getAllPrc = getAllPrc;
exports.getLimitPrc = getLimitPrc;
exports.updatePrc = updatePrc;
exports.deletePrc = deletePrc;