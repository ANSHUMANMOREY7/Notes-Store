const express = require("express");
const router = express.Router();
const multer = require("multer");

const Note = require("../models/Note");
const {
  uploadNote,
  deleteNote,
  getStats,
} = require("../controllers/uploadController");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

// Get storage statistics
router.get("/stats", getStats);

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Delete a note
router.delete("/:id", deleteNote);

// Upload a PDF
router.post("/upload", upload.single("file"), uploadNote);

module.exports = router;