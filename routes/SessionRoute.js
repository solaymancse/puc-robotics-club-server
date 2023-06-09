const { createSession,getALlSession, deleteSession,getLastSession } = require("../controllers/SessionController");

const router = require("express").Router();

router.post("/create-session", createSession);
router.get("/all-session", getALlSession);
router.get("/last-session", getLastSession);
router.delete("/delete-session/:id", deleteSession);

module.exports = router;