const { uploadPhoto, getAllPhotos, deletePhotos,getLimitPhotos } = require('../controllers/GallaryController');

const router = require('express').Router();

router.post('/upload-photo', uploadPhoto);
router.get('/photos', getAllPhotos);
router.get('/limit-photos', getLimitPhotos);
router.delete('/delete/photos/:id', deletePhotos);

module.exports = router;