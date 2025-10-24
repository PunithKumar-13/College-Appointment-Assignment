import mongoose from "mongoose";

// object to store availability details for professors
const newAvailability = new mongoose.Schema({
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // e.g., "2025-10-24"
    required: true,
  },
  startTime: {
    type: String, // e.g., "10:00"
    required: true,
  },
  endTime: {
    type: String, // e.g., "12:00"
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Availability", newAvailability);
