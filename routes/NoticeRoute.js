const { createNotice, getAllNotices, getNotice, deleteNotice, updateNotice } = require("../controllers/NoticeController");

const router = require("express").Router();

router.post("/notices",createNotice);
router.get("/all-notices", getAllNotices);
router.get("/notice/:id", getNotice);
router.put("/notice/update/:id", updateNotice);
router.delete("/notice/:id", deleteNotice);

module.exports = router;
