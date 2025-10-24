import express from "express";
//import all the necessary functions from authControllers.js
import { registerUser, loginUser } from "../Controllers/authControllers.js";  

const router = express.Router(); //create router object

router.post("/register", registerUser); // Register new user (both professor and student)
router.post("/login", loginUser);// Login user (both professor and student)

export default router;
