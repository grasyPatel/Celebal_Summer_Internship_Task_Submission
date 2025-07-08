import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userEmail: { type: String }, 
  userName: { type: String }   
});
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Open' }, 
  createdBy: { type: String, required: true }, 
  assignedTo: { type: String, default: null },

  category: { type: String, default: 'General' },
  priority: { type: String, default: 'Medium' }, 
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema] 
});

export const Ticket = mongoose.model('Ticket', ticketSchema );

