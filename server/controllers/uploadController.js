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




const getStats = async (req, res) => {
  try {
    const notes = await Note.find();
    
    // 1. Total Notes Count
    const totalNotes = notes.length;
    
    // 2. Calculate Storage (Loop through files to get size)
    let totalSizeBytes = 0;
    notes.forEach(note => {
      // Replaces leading slash to find the file in the local uploads folder
      const filePath = path.join(__dirname, "..", note.path.replace(/^\//, ""));
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        totalSizeBytes += stats.size;
      }
    });
    const storageUsedMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);

    // 3. Subject Breakdown (Counting occurrences of each subject)
    const breakdown = {};
    notes.forEach(note => {
      breakdown[note.subject] = (breakdown[note.subject] || 0) + 1;
    });

    res.status(200).json({
      totalNotes,
      totalDownloads: 0, 
      storageUsed: storageUsedMB,
      categoryBreakdown: breakdown
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Error generating stats" });
  }
};

// Update your exports to include the new function
module.exports = { uploadNote, deleteNote, getStats };
