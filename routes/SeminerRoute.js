const router = require("express").Router();

const { createSeminer, getAllSeminer, updateSeminer, deleteSeminer, getSeminer } = require("../controllers/SeminerController");



router.post("/create-seminer",createSeminer);
router.get("/seminers", getAllSeminer);
router.get("/seminer/:id", getSeminer);
router.put("/seminer/update/:id", updateSeminer);
router.delete("/seminer/delete/:id", deleteSeminer);

module.exports = router;
