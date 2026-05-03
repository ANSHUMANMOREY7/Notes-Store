const express = require("express");
const upload = require("../controllers/uploadController");
const fs = require("fs");

const router = express.Router();


router.post("/", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file.filename,
  });
});


router.get("/", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json(err);

    const pdfs = files.map(file => ({
      filename: file,
      path: `/uploads/${file}`
    }));

    res.json(pdfs);
  });
});

module.exports = router;