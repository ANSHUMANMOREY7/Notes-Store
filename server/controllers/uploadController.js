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

const fs = require("fs");
const path = require("path");

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const filePath = path.join(__dirname, "..", note.path.replace(/^\//, ""));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Note.findByIdAndDelete(noteId);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { uploadNote, deleteNote };