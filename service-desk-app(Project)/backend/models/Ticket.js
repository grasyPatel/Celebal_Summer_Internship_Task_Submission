import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Open' }, 
  createdBy: { type: String, required: true }, 
  assignedTo: String, 
  createdAt: { type: Date, default: Date.now }
});

export const Ticket = mongoose.model('Ticket', ticketSchema );

