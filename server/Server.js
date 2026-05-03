const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/uploadRoutes");
mongoose.connect("mongodb://127.0.0.1:27017/notesStore", {
  serverSelectionTimeoutMS: 5000 
})
.then(() => console.log("MongoDB Connected Successfully ✅"))
.catch(err => console.log("MongoDB Connection Error ❌:", err));
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/notes", uploadRoutes);


app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});