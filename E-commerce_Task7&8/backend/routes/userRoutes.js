import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (password will be hashed by pre-save middleware)
    const user = await User.create({ name, email, password });

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  console.log("Login request received", req.body);
  try {
    const { email, password } = req.body;


    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }


    // Check if password matches
    const isMatch = await user.matchPassword(password);
   console.log("Password match:", isMatch); // Add this
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
 console.log("About to create JWT payload"); // Add this
    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
     console.log("JWT payload created:", payload); // Add this
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET); // Add this


    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });
    console.log("JWT token generated successfully"); // Add this
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;