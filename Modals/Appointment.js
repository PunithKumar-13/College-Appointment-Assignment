import mongoose from "mongoose";

// object to store appointment details between student and professor
const newAppointment = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // "2025-10-24"
    required: true,
  },
  time: {
    type: String, // "10:00"
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked",
  },
}, { timestamps: true });

export default mongoose.model("Appointment", newAppointment);
