const Note = require("../models/Note"); 

const uploadNote = async (req, res) => { 
  try {
    const { title, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

   
    const newNote = new Note({
      title,
      subject,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });

    // 4. Save to the database
    await newNote.save(); 

    console.log("Database Success:", newNote);

    res.status(200).json({
      message: "File uploaded and saved to database successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { uploadNote };