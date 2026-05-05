const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Note = require("../models/Note");
const { uploadNote } = require("../controllers/uploadController");
const { uploadNote, deleteNote, getStats } = require("../controllers/uploadController");

// 1. Define Storage Logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// 2. INITIALIZE upload (This was missing!)
const upload = multer({ storage: storage });
router.get("/stats", getStats);
// 3. Define Routes
router.get("/", async (req, res) => {
  
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const notePath = path.join(__dirname, "..", note.path.replace(/^\//, ""));
    if (fs.existsSync(notePath)) {
      fs.unlinkSync(notePath);
    }

    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting note" });
  }
});

// Now 'upload' is defined and can be used here
router.post("/upload", upload.single("file"), uploadNote);

module.exports = router;