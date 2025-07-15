import User from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const users = await User.find({ clerkId: { $ne: userId } });

    // ✅ always return after sending a response
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in fetching users:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
    // optional: end response manually just in case
    res.end();
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { userId: myId } = await req.auth();
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in fetching messages:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
    res.end();
  }
};
