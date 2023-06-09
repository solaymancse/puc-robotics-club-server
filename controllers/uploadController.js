const cloudinary = require('cloudinary');
const fs = require('fs');
const Event = require('../Models/Event');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });

  const uploadController = {
    uploadEvent: async (req, res)=> {
      try {
        // get file
        const {title, description} = req.body;
        const file = req.files.image;
        if(!file || Object.keys(file).length === 0){
          return res.status(400).send("No File Were uploaded.");
        }

        // upload to cloudinary
        cloudinary.v2.uploader.upload(file.path,{folder:"events",width:150,height:150,crop:"fill"},(err,result)=>{
          if(err) throw err;
          fs.unlinkSync(file.path);
          res.status(200).json({
            msg:"Cloud Upload Successfully.",
            url:result.secure_url,
          });

          const newEvent = new Event({
            title,
            description,
            image: file.path,
          });

          const events = newEvent.save();
          res.status(200).json(events);
        });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
      res.status(200).json({msg:"Post Uploaded Successfully"});
    }
  }

  const removeTmp = (path)=>{
    fs.unlink(path, err=>{
      if(err) throw err;
    })
  }
exports.uploadController = uploadController; 