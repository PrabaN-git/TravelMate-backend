// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const placesRoute = require("./routes/places");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");

const app = express();

// Enable CORS for all origins (frontend will be hosted elsewhere)
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoute);
app.use("/api/bookings", bookingRoutes);

// Start server
const PORT = process.env.PORT;  // don’t fallback to 5000 on Render
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// Health check endpoint for Render
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
