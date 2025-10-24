import User from "../Modals/Users.js";
import jwt from "jsonwebtoken";

// Helper function to create JWT tokens for the professors and students
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register a new user(both professor and student)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists 
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" }); //if user already exists print the message

    // Create  the user if not exists
    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      message: "User registered successfully", //after successful registration print the message
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); //if not able to register print the message
  }
};

// Login user function 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the  user by mail id
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check  password if matches login 
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" }); //if not login print the message

    res.json({
      message: "Login successful", //if login successful print the message
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id), //generate token after login for each user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
