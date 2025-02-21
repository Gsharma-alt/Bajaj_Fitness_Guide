import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signupController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Checking input and required constraints
    if (!email || !password) {
      return res.status(400).json({ message: "All input fields are required" });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user first, then generate token
    await newUser.save();

    // Generate token after the user is saved
    generateToken(newUser._id, res);

    console.log("Signup successful");

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      success:true
    });
  } catch (error) {
    console.log("Error in signing up", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide email and password" 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Generate token
    generateToken(user._id, res);

    // Send success response
    return res.status(200).json({
      success: true,
      _id: user._id,
      email: user.email,
    });

  } catch (error) {
    console.log("Error in login:", error.message);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};