//import necessary modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./Routes/authRoutes.js";
import availabilityRoutes from "./Routes/availabilityRoutes.js";
import appointmentRoutes from "./Routes/appointmentRoutes.js";

dotenv.config();
const app = express(); // Initialize Express app

// Middleware
app.use(express.json());

// Connect to MongoDB (only in non-test mode)
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("DB connection error:", err));
}

// Routes for all functionalities
app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentRoutes);

// Basic route to check server status
app.get("/", (req, res) => {
  res.send("College Appointment System API is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
