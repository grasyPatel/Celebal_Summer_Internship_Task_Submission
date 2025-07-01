import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  uid: { type: String, required: true, unique: true }, 
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export const User = mongoose.model('User', userSchema);


