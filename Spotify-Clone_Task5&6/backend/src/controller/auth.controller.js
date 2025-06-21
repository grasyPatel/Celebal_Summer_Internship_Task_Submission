import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const fullName = `${firstName} ${lastName}`;

    await User.findOneAndUpdate(
      { clerkId: id }, // find by clerkId
      {
        $setOnInsert: {
          clerkId: id,
          firstName,
          lastName,
          fullName,
          imageUrl,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
