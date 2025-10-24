import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// object Schema for users (both students & professors)
const newUsers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "professor"],
    required: true,
  },
}, { timestamps: true });

// Password hashing before saving
newUsers.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password changed
  const salt = await bcrypt.genSalt(10);
  
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
newUsers.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", newUsers);


