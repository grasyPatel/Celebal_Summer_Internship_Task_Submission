import express from "express";
import  {User} from "../models/User.js";
const router = express.Router();

router.post('/user', async (req, res) => {
  const { uid, email, fullName } = req.body; // ✅ Extract fullName here

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, role: 'user', fullName }); // ✅ now fullName is defined
      await user.save();
    }

    res.json({ uid: user.uid, email: user.email, role: user.role, fullName: user.fullName });
  } catch (err) {
    console.error("Error in /user POST:", err); // 🔍 helpful log
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // you can add filters or pagination
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
});



export default router;