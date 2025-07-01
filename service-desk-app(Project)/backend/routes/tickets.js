import express from 'express';
import  {Ticket} from "../models/Ticket.js";
const router = express.Router();



router.post('/', async (req, res) => {
  try {
  const { title, description, category, priority, createdBy } = req.body;
const ticket = new Ticket({
  title,
  description,
  category,
  priority,
  createdBy,
  status: 'Open',
  createdAt: new Date()
});
await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

router.get('/', async (req, res) => {
  const { uid, role } = req.query;
 
  try {
    let tickets;

    if (role === 'admin') {
      tickets = await Ticket.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: 'uid',
            as: 'creatorInfo'
          }
        },
        {
          $unwind: {
            path: '$creatorInfo',
            preserveNullAndEmptyArrays: true
          }
        }
      ]);
    } else {
      tickets = await Ticket.find({ createdBy: uid });
    }

    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});


// Update ticket status or assignment
router.put('/:id', async (req, res) => {
  const { status, assignedTo } = req.body;
  try {
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(assignedTo && { assignedTo }) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});


export default router;
