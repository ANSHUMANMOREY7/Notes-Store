const uploadNote = (req, res) => {
  try {
  
    const { title, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const noteData = {
      title,
      subject,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    };

    console.log("Success:", noteData);

    res.status(200).json({
      message: "File uploaded successfully",
      note: noteData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { uploadNote };