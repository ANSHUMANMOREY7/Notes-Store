const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Note = require("../models/Note");
const { uploadNote } = require("../controllers/uploadController");

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

// 3. Define Routes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Now 'upload' is defined and can be used here
router.post("/upload", upload.single("file"), uploadNote);

module.exports = router;