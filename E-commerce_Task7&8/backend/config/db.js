import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Mongo db Faliled to connect: ");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB; 
