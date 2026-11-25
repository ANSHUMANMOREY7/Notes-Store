const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");
const { PDFDocument } = require("pdf-lib");

const getPageCount = async (buffer) => {
  try {
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    return pdf.getPageCount();
  } catch (err) {
    console.error("Page count failed:", err.message);
    return undefined; // don't block the upload if counting fails
  }
};

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

const uploadNote = async (req, res) => {
  try {
    const { subject, semester, unit, description } = req.body;

    if (typeof subject !== "string" || !subject.trim()) {
      return res.status(400).json({
        message: "Subject is required",
      });
    }

    const semesterNumber = Number(semester);

    if (![1, 2, 3, 4].includes(semesterNumber)) {
      return res.status(400).json({
        message: "Invalid semester",
      });
    }

    if (!unit) {
      return res.status(400).json({
        message: "Unit is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Clean subject name
    const cleanSubject = subject.trim().replace(/\s+/g, " ");

    // Fetch existing subjects for selected semester
    const existingSubjects = await Note.distinct("subject", {
      semester: semesterNumber,
    });

    // Check for existing subject (ignore case and extra spaces)
    const matchedSubject = existingSubjects.find(
      (sub) =>
        sub.trim().replace(/\s+/g, " ").toLowerCase() ===
        cleanSubject.toLowerCase()
    );

    
    // Reuse existing subject name if available
    const finalSubject = matchedSubject || cleanSubject;

    // Upload PDF to Cloudinary
    const result = await uploadToCloudinary(req.file);

    // Count pages
    const pageCount = await getPageCount(req.file.buffer);
    console.log("PAGE COUNT:", pageCount);

    const newNote = new Note({
      title: finalSubject,
      subject: finalSubject,
      semester: semesterNumber,
      unit,
      description: description || "",
      filename: req.file.originalname,
      path: result.secure_url,
      cloudinaryPublicId: result.public_id,
      fileSize: result.bytes,
      pages: pageCount,
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
      error: error.message,
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
// Get Repository Statistics
const getStats = async (req, res) => {
  try {
    const notes = await Note.find()
      .select("subject semester unit fileSize")
      .lean();

    const totalNotes = notes.length;

    let totalSizeBytes = 0;
    let totalQuestionBanks = 0;
    let totalUnitNotes = 0;

    const uniqueSubjects = new Set();

    const categoryBreakdown = Object.create(null);

    const semesterBreakdown = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    };

    const semesterSubjects = {
      1: Object.create(null),
      2: Object.create(null),
      3: Object.create(null),
      4: Object.create(null),
    };

    const subjectNames = new Map();
    const subjectCoverage = {
  1: Object.create(null),
  2: Object.create(null),
  3: Object.create(null),
  4: Object.create(null),
};

    notes.forEach((note) => {

      // Calculate storage
      totalSizeBytes += Number(note.fileSize) || 0;

      // Count question banks and unit notes
      if (String(note.unit).trim().toUpperCase() === "QB") {
        totalQuestionBanks++;
      } else {
        totalUnitNotes++;
      }

      // Normalize subject names
      const cleanSubject =
        note.subject?.trim().replace(/\s+/g, " ") ||
        "Unknown Subject";

      const subjectKey = cleanSubject.toLowerCase();

      if (!subjectNames.has(subjectKey)) {
        subjectNames.set(subjectKey, cleanSubject);
      }

      const subject = subjectNames.get(subjectKey);

      uniqueSubjects.add(subjectKey);

      // Overall subject breakdown
      categoryBreakdown[subject] =
        (categoryBreakdown[subject] || 0) + 1;

      // Semester-wise breakdown
      const semester = Number(note.semester);

if ([1, 2, 3, 4].includes(semester)) {
  semesterBreakdown[semester]++;

  semesterSubjects[semester][subject] =
    (semesterSubjects[semester][subject] || 0) + 1;

  // Initialize subject coverage
  if (!subjectCoverage[semester][subject]) {
    subjectCoverage[semester][subject] = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      QB: false,
    };
  }

  // Normalize unit value
  const unit = String(note.unit).trim().toUpperCase();

  // Mark available study material
  if (["1", "2", "3", "4", "5", "QB"].includes(unit)) {
    subjectCoverage[semester][subject][unit] = true;
  }
}
    });

    // Storage calculations
    const storageLimit = 500;

    const storageUsed = Number(
      (totalSizeBytes / (1024 * 1024)).toFixed(2)
    );

    const storageRemaining = Number(
      Math.max(0, storageLimit - storageUsed).toFixed(2)
    );

    const storagePercentage = Number(
      ((storageUsed / storageLimit) * 100).toFixed(2)
    );

    // Send statistics
    res.status(200).json({
      totalNotes,
      totalSubjects: uniqueSubjects.size,
      totalQuestionBanks,
      totalUnitNotes,
      totalDownloads: 0,

      storageUsed,
      storageLimit,
      storageRemaining,
      storagePercentage,

categoryBreakdown,
semesterBreakdown,
semesterSubjects,
subjectCoverage,
      lastUpdated: new Date().toISOString(),
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
