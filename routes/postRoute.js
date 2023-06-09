const express = require('express');

const router = express.Router();
const {uploadController} = require("../controllers/uploadController");

router.post('/add', uploadController.uploadEvent);

module.exports = router;