const express = require("express");
const router = express.Router();
const fs = require("fs"); 
const path = require("path");
const { uploadNote } = require("../controllers/uploadController");

router.get("/", (req, res) => {
  const uploadsDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Could not list files" });
    }

    const fileList = files.map((file) => ({
      filename: file,
      path: `/uploads/${file}`
    }));

    res.status(200).json(fileList);
  });
});
router.post("/upload", upload.single("file"), uploadNote);
module.exports = router;