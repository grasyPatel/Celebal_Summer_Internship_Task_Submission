// import express from 'express';
// import  {Ticket} from "../models/Ticket.js";
// const router = express.Router();



// router.post('/', async (req, res) => {
//   try {
//   const { title, description, category, priority, createdBy } = req.body;
// const ticket = new Ticket({
//   title,
//   description,
//   category,
//   priority,
//   createdBy,
//   status: 'Open',
//   createdAt: new Date()
// });
// await ticket.save();
//     res.status(201).json(ticket);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create ticket' });
//   }
// });

// router.get('/', async (req, res) => {
//   const { uid, role } = req.query;
 
//   try {
//     let tickets;

//     if (role === 'admin') {
//       tickets = await Ticket.aggregate([
//         {
//           $lookup: {
//             from: 'users',
//             localField: 'createdBy',
//             foreignField: 'uid',
//             as: 'creatorInfo'
//           }
//         },
//         {
//           $unwind: {
//             path: '$creatorInfo',
//             preserveNullAndEmptyArrays: true
//           }
//         }
//       ]);
//     } else {
//       tickets = await Ticket.find({ createdBy: uid });
//     }

//     res.json(tickets);
//   } catch (err) {
//     console.error('Error fetching tickets:', err);
//     res.status(500).json({ error: 'Failed to fetch tickets' });
//   }
// });


// // Update ticket status or assignment
// router.put('/:id', async (req, res) => {
//   const { status, assignedTo } = req.body;
//   try {
//     const updated = await Ticket.findByIdAndUpdate(
//       req.params.id,
//       { ...(status && { status }), ...(assignedTo && { assignedTo }) },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update ticket' });
//   }
// });


// export default router;

// Updated API Routes (routes/tickets.js)
import express from 'express';
import { Ticket } from "../models/Ticket.js";

const router = express.Router();

// Create new ticket
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

// Get tickets
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

// Update ticket - Enhanced to handle user updates
router.put('/:id', async (req, res) => {
  try {
    const { status, assignedTo, title, description, category, priority } = req.body;
    
    // Build update object dynamically
    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (priority) updateData.priority = priority;
    
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(updated);
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// Add comment to ticket
router.post('/:id/comments', async (req, res) => {
  try {
    const { comment, createdBy, userEmail, userName } = req.body;
    
    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'Comment text is required' });
    }
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    const newComment = {
      text: comment.trim(),
      createdBy: createdBy,
      createdAt: new Date(),
      userEmail: userEmail || null,
      userName: userName || null
    };
    console.log('New Comment:', newComment);
    
    ticket.comments.push(newComment);
    await ticket.save();
    
    res.json(ticket);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get single ticket by ID (optional - for detailed view)
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(ticket);
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Delete ticket (optional)
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

export default router;