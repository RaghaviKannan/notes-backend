const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notesController");
const authenticateToken = require("../utils/authenticate");

router.use(authenticateToken);

router.post("/", noteController.createNote);
router.get("/", noteController.getNotes);
router.get("/:id", noteController.getNoteById);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
