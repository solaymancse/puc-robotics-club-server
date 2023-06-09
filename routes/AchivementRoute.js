const { createAchivement, getAllAchivement, deleteAchivement, updateAchivement,getLimitedAchivement } = require('../controllers/AchivementController');

const router = require('express').Router();

router.post('/create-achivement',createAchivement );
router.get('/achivements', getAllAchivement);
router.get('/limit-achivement', getLimitedAchivement);
router.put('/update/achivement/:id', updateAchivement );
router.delete('/delete/achivement/:id', deleteAchivement );

module.exports = router;