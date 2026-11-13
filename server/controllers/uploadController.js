const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");

// Upload PDF to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "notes-store",
        resource_type: "raw",
        public_id: `${Date.now()}.pdf`,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Upload Note
const uploadNote = async (req, res) => {
  try {
    const { title, subject } = req.body;

    if (!title || !subject) {
      return res.status(400).json({
        message: "Title and subject are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Upload PDF to Cloudinary
    const result = await uploadToCloudinary(req.file);

    // Save note details in MongoDB
    const newNote = new Note({
      title,
      subject,
      filename: req.file.originalname,
      path: result.secure_url,
      cloudinaryPublicId: result.public_id,
      fileSize: result.bytes,
    });

    await newNote.save();

    res.status(200).json({
      message: "File uploaded successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: "File upload failed",
    });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // Delete PDF from Cloudinary
    if (note.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(note.cloudinaryPublicId, {
        resource_type: "raw",
      });
    }

    // Delete note from MongoDB
    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({
      message: "Error deleting note",
    });
  }
};

// Get Statistics
const getStats = async (req, res) => {
  try {
    const notes = await Note.find();

    const totalNotes = notes.length;

    // Calculate total storage
    let totalSizeBytes = 0;

    notes.forEach((note) => {
      totalSizeBytes += note.fileSize || 0;
    });

    const storageUsedMB = (
      totalSizeBytes / (1024 * 1024)
    ).toFixed(2);

    // Count notes by subject
    const breakdown = {};

    notes.forEach((note) => {
      breakdown[note.subject] =
        (breakdown[note.subject] || 0) + 1;
    });

    res.status(200).json({
      totalNotes,
      totalDownloads: 0,
      storageUsed: storageUsedMB,
      categoryBreakdown: breakdown,
    });
  } catch (error) {
    console.error("Stats Error:", error);

    res.status(500).json({
      message: "Error generating stats",
    });
  }
};

module.exports = {
  uploadNote,
  deleteNote,
  getStats,
};
