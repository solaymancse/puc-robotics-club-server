const { createPrc,getAllPrc,updatePrc,deletePrc,getLimitPrc } = require('../controllers/PRCController');

const router = require('express').Router();

router.post('/create-prc',createPrc );
router.get('/all-prc', getAllPrc);
router.get('/limit-prc', getLimitPrc);
router.put('/update/prc/:id', updatePrc );
router.delete('/delete/prc/:id', deletePrc );

module.exports = router;