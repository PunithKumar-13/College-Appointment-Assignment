# College Appointment System (Backend API)

## Description
This project is a **backend API** for managing appointments between **students and professors** in a college setting. Professors can specify their available time slots, and students can book appointments accordingly. The system uses **JWT-based authentication** and ensures data integrity with MongoDB.

---

## Features

- **User Authentication**
  - Register and login for students and professors
  - Passwords hashed with bcrypt
  - JWT token authentication

- **Professor Availability Management**
  - Professors can add availability slots (date, start time, end time)
  - Multiple slots per day supported

- **Appointment Booking**
  - Students can view available slots for professors
  - Book appointments for specific date & time
  - Professors can cancel appointments
  - Students can view booked or cancelled appointments

- **Automated Testing**
  - End-to-end (E2E) tests using **Jest** + **Supertest**
  - Validates main workflows: availability creation, booking, cancellation, and student view

- **Database**
  - MongoDB using Mongoose schemas
  - Maintains relationships between Users, Availability, and Appointments

---

## Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: JWT  
- **Testing**: Jest, Supertest  
- **Environment Management**: dotenv  

---

## Installation

1. Clone the repository
```bash
git clone <add url>
cd college-appointmets
```
2.Install dependencies
```bash
npm install
```

3.Create a .env file in the root directory:
```bash
PORT=5000
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
JWT_SECRET=your_super_secret_key
```
4.Run the server
```bash
npm start 
or 
node server.js
```
- Now the server will run on localhost 

## Base routes

- /api/auth → register & login
- /api/availability → add/view professor availability
- /api/appointments → book, cancel, and view appointments

## Running tests
``` bash
npm test
```
- Runs E2E tests validating main user flows:
- Professor adds availability
- Student books appointment
- Professor cancels appointment
- Student views cancelled appointment

## API Endpoints 

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register | Register a student or professor |
| POST   | /api/auth/login | Login and receive JWT token |
| POST   | /api/availability | Add professor availability |
| GET    | /api/availability/:professorId | View available slots for a professor |
| POST   | /api/appointments/book | Book an appointment as a student |
| PUT    | /api/appointments/cancel/:appointmentId | Cancel an appointment as a professor |
| GET    | /api/appointments/student/:studentId | View all appointments for a student |


## Notes

- Backend-focused project; no frontend included.  
- Designed to be fully testable using **Postman** + automated **Jest tests**.  
- **MongoDB Access**: Make sure your IP address is added to the MongoDB cluster's IP whitelist in Atlas, otherwise the server will not be able to connect.











