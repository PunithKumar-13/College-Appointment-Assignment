import express from "express";
//import all the necessary functions from appointmentController.js
import { AvailableSlots , bookAnAppointment, cancelAnAppointment, getStudentAppointments} from "../Controllers/appointmentController.js";

const router = express.Router();

// get all available slots for a professor
router.get("/available-slots", AvailableSlots);

// Book an  appointment for a student with professor
router.post("/book", bookAnAppointment);

// Cancel appointment for a student with professor
router.post("/cancel", cancelAnAppointment);

// Get student appointments with professors
router.get("/my-appointments", getStudentAppointments);




export default router;
