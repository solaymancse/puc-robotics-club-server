const Event = require("../Models/Event");
const fs = require("fs");
const cloudinary = require('../config/cloudinary');
const cloudinaryconfig = require('../config/cloudinary');

// create new events
const createEvent = (req, res) => {
  const { title, description, eventDate } = req.body;
  const file = req.files.image;
  if (!file || Object.keys(file).length === 0) {
    return res.status(400).send("No File Were uploaded.");
  }
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) throw err;
    removeTmp(file.tempFilePath);
    const savedEvent = new Event({
      title,
      description,
      eventDate,
      image: result.url,
      cloudinaryid: result.public_id,
    });
    savedEvent.save();
    res.status(200).json(savedEvent);
  });
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
// update events
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      try {
        await Event.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json("Updated successfull");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("Can't find the post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// delete events
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const imgLink = event.cloudinaryid;
    if (event) {
      try {
        cloudinary.uploader.destroy(imgLink, async (err, result) => {
          if (err) throw err;
          await event.delete();
          res.status(200).json({msg:"successfull",result});
        });
      } catch (error) {
        res.status(500).json(error.message);
      }
    } else {
      res.status(401).json("Can't find the post.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// Get Single event
const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Get All event
const getAllEvent = async (req, res) => {
  try {
    const event = await Event.find().sort({ $natural: -1 });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get upcoming event
const getUpcomingEvent = async (req, res) => {
  try {
    const upcomingEvent = await Event.find().sort({ $natural: -1 }).limit(4);
    res.status(200).json(upcomingEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get lastest event
const getLatestEvent = async (req, res) => {
  try {
    const upcomingEvent = await Event.find().sort({ $natural: -1 }).skip(4);
    res.status(200).json(upcomingEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createEvent = createEvent;
exports.getSingleEvent = getSingleEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.getAllEvent = getAllEvent;
exports.getUpcomingEvent = getUpcomingEvent;
exports.getLatestEvent = getLatestEvent;
