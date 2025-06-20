import express from "express";
import  {User} from "../models/User.js";
const router = express.Router();

// Get or create user by UID
router.post('/user', async (req, res) => {
  const { uid, email } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      // Default role is 'user'. You can adjust this logic.
      user = new User({ uid, email, role: 'user' });
      await user.save();
    }

    res.json({ uid: user.uid, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;