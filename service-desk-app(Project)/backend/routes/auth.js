import express from "express";
import { User } from "../models/User.js";
const router = express.Router();

router.post("/user", async (req, res) => {
  const { uid, email, fullName, role } = req.body;
   
  try {
    
    let user = await User.findOne({ uid });

    if (!user) {
     
      user = new User({ uid, email, role:role ||'user'
        , fullName });
      
      await user.save();
    } else {
    
      user.fullName = fullName;
      if (role && user.role !== role) {
        user.role = role;
      }

     
      await user.save();
    }

   
    res.json({
      uid: user.uid,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    });
  } catch (err) {
    console.error("Error in /user POST:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error while fetching users" });
  }
});

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const validRoles = ["user", "admin", "moderator"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    // Find and update the user
    const user = await User.findOneAndUpdate(
      { uid: userId },
      { role: role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user: {
        uid: user.uid,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ error: "Server error while updating user role" });
  }
});

export default router;
