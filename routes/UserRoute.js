const router = require('express').Router();

const { adminSignup, adminLogin, newRegisterMember, getAllMember, verifyToken, adminLogout,countAllMember,getFiveMember,memberApproved } = require('../controllers/UserControllers');


// creating admin
router.post('/admin-signup', adminSignup);
router.post('/login', adminLogin);
router.get('/logout', verifyToken,adminLogout);

// register new club members
router.post('/member',newRegisterMember);
router.get('/all-member',getAllMember);
router.get('/limit-member',getFiveMember);
router.get('/count-member',countAllMember);
router.put('/approve/:id',memberApproved);

module.exports = router;