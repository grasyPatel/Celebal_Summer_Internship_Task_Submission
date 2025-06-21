import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
   
  },
  firstName: String,
  lastName: String,
  fullName: { type: String, required: false }, // remove required
  imageUrl: String,
}, {timestamps:true} );


const User=mongoose.model("user",userSchema);

export default User;