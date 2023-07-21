const Seminer = require("../Models/Seminer");
const fs = require("fs");
const cloudinary = require('../config/cloudinary');
const cloudinaryconfig = require('../config/cloudinary');

// create new seminer
const createSeminer = async (req, res) => {
  const { title, desc } = req.body;
  const file = req.files.image;
  if (!file || Object.keys(file).length === 0) {
    return res.status(400).json({ msg: "No file were uploaded." });
  }
  
  if(file.size > 1024*1024){
    removeTmp(file.tempFilePath);
    return res.status(400).json({msg:"Size too large"});
  }

  if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg'){
    removeTmp(file.tempFilePath);
    return res.status(400).json({msg:"File format incorrect"});
  }
  cloudinary.uploader.upload(file.tempFilePath,{folder:"Seminer"}, (err, result) => {
    if (err) throw err;
    removeTmp(file.tempFilePath);
    const savedSeminer = new Seminer({
      title,
      desc,
      image: result.url,
      cloudinaryId: result.public_id,
    });

    savedSeminer.save();
    res.status(200).json(savedSeminer);
  });
};
const removeTmp = (path)=>{
  fs.unlink(path, err=>{
    if(err) throw err;
  })
}
// get All notices
const getAllSeminer = async(req, res)=>{
    try {
        const seminers = await Seminer.find().sort({ $natural: -1});
        res.status(200).json(seminers);
    } catch (error) {
      res.status(400).json({msg: error.message});
        
    }
}

// update seminer
const updateSeminer = async(req, res)=>{
        try {
            const seminer = await Seminer.findById(req.params.id);
            if(seminer){
                try {
                    await Seminer.findByIdAndUpdate(
                        req.params.id,
                        {$set: req.body},
                        {new: true}
                    )
                    res.status(200).json({msg:"Successfully Updated..."});

                } catch (error) {
                  res.status(400).json(error);  
                }
            }else{
                res.status(401).json("Can't find the post.");
            }
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}
// delete seminer
const deleteSeminer = async(req, res)=>{
        try {
            const seminer = await Seminer.findById(req.params.id);
            const imgLink = seminer.cloudinaryId;
            if(seminer){
                try {
                    cloudinary.uploader.destroy(imgLink, async(err, result)=>{
                      if(err) throw err;
                      await seminer.delete();
                      res.status(200).json({msg:"successful", result});
                    })

                } catch (error) {
                  res.status(400).json(error.message);  
                }
            }else{
                res.status(400).json("Can't find the post.");
            }
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}
// get single seminer
const getSeminer = async(req, res)=>{
        try {
            const seminer = await Seminer.findById(req.params.id);
          res.status(200).json(seminer);
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}

exports.createSeminer = createSeminer;
exports.getAllSeminer = getAllSeminer;
exports.updateSeminer = updateSeminer;
exports.deleteSeminer = deleteSeminer;
exports.getSeminer = getSeminer;
