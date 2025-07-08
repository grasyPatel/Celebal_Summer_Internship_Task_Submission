import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Open' }, 
  createdBy: { type: String, required: true }, 
  assignedTo: { type: String, default: null },

  category: { type: String, default: 'General' },
  priority: { type: String, default: 'Medium' }, 
  createdAt: { type: Date, default: Date.now }
});

export const Ticket = mongoose.model('Ticket', ticketSchema );

