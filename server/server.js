require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");

const superAdminRoutes = require("./routes/superAdminRoutes");


// Trust Render's reverse proxy
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://notes-store-ghrce.netlify.app",
    ],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/notes", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/super-admin", superAdminRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Error handler must come after all routes
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");

    app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error ❌:", err);
  });