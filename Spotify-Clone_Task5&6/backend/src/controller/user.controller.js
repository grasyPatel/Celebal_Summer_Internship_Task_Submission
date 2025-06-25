import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const { userId } = await req.auth(); // ✅ new way
    
    const users = await User.find({ clerkId: { $ne: userId } });
    console.log("Fetched data: "+users);
        console.log("User: "+userId);

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in fetching users:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  }
};

