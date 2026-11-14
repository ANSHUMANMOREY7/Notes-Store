const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  semester: { type: Number },
  unit: { type: Number },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  cloudinaryPublicId: {
  type: String,
},

fileSize: {
  type: Number,
  default: 0,
},
});

module.exports = mongoose.model("Note", NoteSchema);