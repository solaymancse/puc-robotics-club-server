const router = require('express').Router();
const { createEvent, updateEvent, deleteEvent, getSingleEvent, getAllEvent,getUpcomingEvent,getLatestEvent } = require('../controllers/EventController');
const uploadImage = require("../middleware/uploadImage");


router.post("/events", createEvent);
router.get("/upcoming-events", getUpcomingEvent);
router.get("/latest-events", getLatestEvent);
router.get("/all-events", getAllEvent);
router.get("/events/:id", getSingleEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;