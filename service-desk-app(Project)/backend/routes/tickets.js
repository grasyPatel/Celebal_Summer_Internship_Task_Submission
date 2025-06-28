import express from 'express';
import  {Ticket} from "../models/Ticket.js";
const router = express.Router();



router.post('/', async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const ticket = new Ticket({ title, description, createdBy });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

router.get('/', async (req, res) => {
  const { uid, role } = req.query;
  try {
    const tickets =
      role === 'admin'
        ? await Ticket.find()
        : await Ticket.find({ createdBy: uid });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

export default router;
