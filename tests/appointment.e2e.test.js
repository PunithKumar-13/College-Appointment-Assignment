import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../Modals/Users.js";
import Availability from "../Modals/Availability.js";
import Appointment from "../Modals/Appointment.js";


let studentId, professorId, appointmentId; //variables to store ids

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST); //connect to the mongo URI 

  await User.deleteMany({});
  await Availability.deleteMany({});
  await Appointment.deleteMany({});

  // Register  the professor with all details
  const profRes = await request(app).post("/api/auth/register").send({
    name: "ProfTest",
    email: "prof@test.com",
    password: "password123",
    role: "professor",
  });
  professorId = profRes.body.user.id;

  // Register student with all details
  const studentRes = await request(app).post("/api/auth/register").send({
    name: "StudentTest",
    email: "student@test.com",
    password: "password123",
    role: "student",
  });
  studentId = studentRes.body.user.id;
});

afterAll(async () => { //close the connection after all tests
  await mongoose.connection.close();
});

describe("College Appointment E2E Flow", () => {
  it("should allow professor to add availability, student to book, professor to cancel, and student sees cancelled appointment", async () => {
    // Add availability for professor
    const availRes = await request(app)
      .post("/api/availability/add")
      .send({
        professorId,
        date: "2025-10-25",
        startTime: "10:00",
        endTime: "12:00",
      });
    expect(availRes.status).toBe(201);

    // Student books appointment with professor
    const bookRes = await request(app)
      .post("/api/appointments/book")
      .send({
        studentId,
        professorId,
        date: "2025-10-25",
        time: "10:00",
      });
    expect(bookRes.status).toBe(201);
    appointmentId = bookRes.body.appointment._id;

    // Professor cancels appointment with students
    const cancelRes = await request(app)
      .post("/api/appointments/cancel")
      .send({
        professorId,
        appointmentId,
      });
    expect(cancelRes.status).toBe(200);
    expect(cancelRes.body.appointment.status).toBe("cancelled");

    // Student views appointments with professors
    const myAppRes = await request(app)
      .get(`/api/appointments/my-appointments?studentId=${studentId}`);
    expect(myAppRes.status).toBe(200);
    expect(myAppRes.body.appointments[0].status).toBe("cancelled");
  });
});
