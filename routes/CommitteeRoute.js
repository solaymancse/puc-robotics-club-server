const router = require('express').Router();
const { createCommittee,getCommitteeMembers } = require('../controllers/CommitteeController');



router.post('/create-committee',createCommittee);
router.get('/committee/:sessionId',getCommitteeMembers);

module.exports = router;