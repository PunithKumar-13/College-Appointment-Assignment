


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
```

git clone <your-repo-url>
cd college-appointments

```

2. Install dependencies
```

npm install

```

3. Create a `.env` file in the root directory:
```

PORT=5000
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
JWT_SECRET=your_super_secret_key

```

4. Run the server
```

npm start

# or

node server.js

```
Server runs on `http://localhost:5000`

---

## Base Routes

- `/api/auth` → register & login  
- `/api/availability` → add/view professor availability  
- `/api/appointments` → book, cancel, and view appointments  

---

## Running Tests

```

npm test

```

This runs the **E2E automated test** that validates:
1. Professor adds availability  
2. Student books appointment  
3. Another student books another slot  
4. Professor cancels appointment  
5. Student verifies the cancelled appointment  

---

## API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/auth/register` | Register a new user (student or professor) |
| **POST** | `/api/auth/login` | Login as student or professor and receive a JWT token |
| **POST** | `/api/availability/add` | Add availability for a professor |
| **GET** | `/api/appointments/available-slots?professorId=&date=` | Get available slots for a professor on a given date |
| **POST** | `/api/appointments/book` | Book an appointment (student → professor) |
| **POST** | `/api/appointments/cancel` | Cancel an appointment (by professor) |
| **GET** | `/api/appointments/my-appointments?studentId=` | Get all appointments for a student |

---

## How to Test End-to-End (E2E)

You can test the full workflow using **Postman** or run the automated test:

### 🧪 Option 1: Using Postman (Manual)
1. Register Professor → `/api/auth/register`
2. Register Student → `/api/auth/register`
3. Login both users → `/api/auth/login`
4. Add availability (as Professor) → `/api/availability/add`
5. View available slots (as Student) → `/api/appointments/available-slots`
6. Book appointment → `/api/appointments/book`
7. Cancel appointment (as Professor) → `/api/appointments/cancel`
8. Check student’s appointments → `/api/appointments/my-appointments`

### ⚙️ Option 2: Automated E2E Test (Recommended)
1. Run the automated test:
```

npm test

```
2. The test automatically executes the full flow:
   - Creates sample users  
   - Adds availability  
   - Books and cancels appointments  
   - Verifies final results  

3. Record this test in Loom for submission (as required in the assignment).

---

## Notes

- Backend-focused project; no frontend included.  
- Designed to be fully testable using **Postman** and **Jest automated tests**.  
- Ensure your **MongoDB Atlas IP is whitelisted** before starting the server.  

---
```

