import Appointment from "../Modals/Appointment.js";
import Availability from "../Modals/Availability.js";
import User from "../Modals/Users.js";

//function to get available slots for a professor on a given date

export const AvailableSlots = async (req, res) => {
  try {
    const { professorId, date } = req.query;

    // Check if professor exists
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== "professor") {
      return res.status(400).json({ message: "Invalid professor ID" });
    }

    // Get the details of all availabilities for this professor and date
    const availabilities = await Availability.find({ professor: professorId, date });

    // Get the details of  all booked appointments for this professor and date
    const bookedAppointments = await Appointment.find({ professor: professorId, date, status: "booked" });

    // details of  booked times
    const bookedTimes = bookedAppointments.map(a => a.time);

    // Filter the  slots that are not booked
    const availableSlots = [];
    availabilities.forEach(slot => {

      // we will Assume  1-hour slots for simplicity
      let current = slot.startTime;
      while (current < slot.endTime) {
        if (!bookedTimes.includes(current)) {
          availableSlots.push(current);
        }
        // we just increment by 1 hour
        const [h, m] = current.split(":").map(Number);
        const nextHour = (h + 1).toString().padStart(2, "0") + ":00";
        current = nextHour;
      }
    });

    res.json({
      professor: professor.name,
      date,
      availableSlots,
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); //if not able to fetch available slots
  }
};


//  function to Book an appointment
export const bookAnAppointment = async (req, res) => {
  try {
    const { studentId, professorId, date, time } = req.body;

    // check the student details with id
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Check the professor details with id 
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== "professor") {
      return res.status(400).json({ message: "Invalid professor ID" });
    }

    // check if the selected time is available
    const availability = await Availability.findOne({
      professor: professorId,
      date,
      startTime: { $lte: time },
      endTime: { $gt: time }
    });

    if (!availability) { //if not available print the message
      return res.status(400).json({ message: "Selected time not available" });
    }

    // Check if the slot is  already booked
    const existing = await Appointment.findOne({ professor: professorId, date, time, status: "booked" });
    if (existing) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    //if the slot is booked  Create  an appointment
    const appointment = await Appointment.create({
      student: studentId,
      professor: professorId,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully", //if booked successfully print the message
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); //if not able to book appointment print the message
  }
};


// function to cancle am  appointment
export const cancelAnAppointment = async (req, res) => {
  try {
    const { professorId, appointmentId } = req.body;

    // Check professor details 
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== "professor") {
      return res.status(400).json({ message: "Invalid professor ID" });
    }

    // Find appointment by correct id and professor
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || appointment.professor.toString() !== professorId) {
      return res.status(400).json({ message: "Appointment not found for this professor" });
    }

    // Update staus if 
    appointment.status = "cancelled";
    await appointment.save();

    res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all appointments for a student
export const getStudentAppointments = async (req, res) => {
  try {
    const { studentId } = req.query;

    // Check student exists with id
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Get appointments of the students with appointed professor details
    const appointments = await Appointment.find({ student: studentId }) 
      .populate("professor", "name email")
      .sort({ date: 1, time: 1 });

    res.json({
      student: student.name,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });//if not able to fetch student appointments print error message
  }
};
