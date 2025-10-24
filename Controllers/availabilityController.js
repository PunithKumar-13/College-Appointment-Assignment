import Availability from "../Modals/Availability.js";
import User from "../Modals/Users.js";

// Add availability for a professor so that students can book appointments
export const addAvailability = async (req, res) => {
  try {
    const { professorId, date, startTime, endTime } = req.body;

    // Check if user exists and is a professor by id 
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== "professor") {
      return res.status(400).json({ message: "Invalid professor ID" });
    }

    // Create availability to store the available slots for professors
    const availability = await Availability.create({
      professor: professorId,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({
      message: "Availability added successfully", //if added successfully print the message
      availability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });//if not able to add availability print the message
  }
};
