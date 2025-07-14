import express from "express";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// get users /api/admin/users
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//post /api/admin/users
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let users = await User.findOne({ email });
    if (users) {
      return res.status(400).json({ message: "User already exists" });
    }
    users = new User({ name, email, password, role: role || "customer" });
    await users.save();
    res.status(201).json({ message: "User created successfully", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error in creating user" });
  }
});

// put /api/admin/users/:id
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error in updating user" });
  }
});

// put /api/admin/users/:id
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error in deleting user" });
  }
});

export default router;
