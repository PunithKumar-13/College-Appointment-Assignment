import express from "express";
import { addAvailability } from "../Controllers/availabilityController.js"; //import addAvailability function

const router = express.Router();

// Route to add professor availability 
router.post("/add", addAvailability);

export default router;
