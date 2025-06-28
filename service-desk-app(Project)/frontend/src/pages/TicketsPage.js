import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SidebarLayout from '../components/SidebarLayout';
import axios from 'axios';

const TicketsPage = () => {
  const { currentUser, role } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/tickets`, {
        params: { uid: currentUser.uid, role }
      });
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/tickets`, {
        title,
        description,
        createdBy: currentUser.uid
      });
      setTitle('');
      setDescription('');
      fetchTickets();
    } catch (err) {
      console.error('Error creating ticket:', err);
    }
  };

  useEffect(() => {
    if (currentUser) fetchTickets();
  }, [currentUser]);

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {role !== 'admin' && (
          <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Create Ticket</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-2 p-2 border rounded"
              rows={3}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          </form>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4">My Tickets</h2>
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h3 className="font-semibold">{ticket.title}</h3>
                <p className="text-sm">{ticket.description}</p>
                <p className="text-xs mt-1 text-gray-500">Status: {ticket.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default TicketsPage;
