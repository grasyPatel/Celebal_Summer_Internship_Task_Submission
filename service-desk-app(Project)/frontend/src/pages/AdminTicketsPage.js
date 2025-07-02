import { useEffect, useState, useContext } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [updatingTickets, setUpdatingTickets] = useState(new Set());
  
  const { currentUser } = useContext(AuthContext);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/tickets`, {
        params: { role: 'admin' },
      });
      console.log("AdminPage:", res.data)
      setTickets(res.data);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
      setError('Failed to load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    if (updatingTickets.has(ticketId)) return;
    
    try {
      setUpdatingTickets(prev => new Set([...prev, ticketId]));
      await axios.put(`${process.env.REACT_APP_API_BASE}/api/tickets/${ticketId}`, {
        status: newStatus,
      });
      
      // Update local state optimistically
      setTickets(prev => prev.map(ticket => 
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update ticket status. Please try again.');
    } finally {
      setUpdatingTickets(prev => {
        const newSet = new Set(prev);
        newSet.delete(ticketId);
        return newSet;
      });
    }
  };

  const handleAssign = async (ticketId) => {
    if (updatingTickets.has(ticketId)) return;
    
    try {
      setUpdatingTickets(prev => new Set([...prev, ticketId]));
      await axios.put(`${process.env.REACT_APP_API_BASE}/api/tickets/${ticketId}`, {
        assignedTo: currentUser.email || currentUser.uid,
      });
      
      // Update local state optimistically
      setTickets(prev => prev.map(ticket => 
        ticket._id === ticketId 
          ? { ...ticket, assignedTo: currentUser.email || currentUser.uid } 
          : ticket
      ));
    } catch (err) {
      console.error('Error assigning ticket:', err);
      setError('Failed to assign ticket. Please try again.');
    } finally {
      setUpdatingTickets(prev => {
        const newSet = new Set(prev);
        newSet.delete(ticketId);
        return newSet;
      });
    }
  };

  const handleUnassign = async (ticketId) => {
    if (updatingTickets.has(ticketId)) return;
    
    try {
      setUpdatingTickets(prev => new Set([...prev, ticketId]));
      await axios.put(`${process.env.REACT_APP_API_BASE}/api/tickets/${ticketId}`, {
        assignedTo: null,
      });
      
      // Update local state optimistically
      setTickets(prev => prev.map(ticket => 
        ticket._id === ticketId ? { ...ticket, assignedTo: null } : ticket
      ));
    } catch (err) {
      console.error('Error unassigning ticket:', err);
      setError('Failed to unassign ticket. Please try again.');
    } finally {
      setUpdatingTickets(prev => {
        const newSet = new Set(prev);
        newSet.delete(ticketId);
        return newSet;
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'text-blue-600 bg-blue-50';
      case 'in progress': return 'text-orange-600 bg-orange-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredAndSortedTickets = tickets
    .filter(ticket => {
      if (filter === 'all') return true;
      if (filter === 'assigned') return ticket.assignedTo;
      if (filter === 'unassigned') return !ticket.assignedTo;
      return ticket.status?.toLowerCase() === filter;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <SidebarLayout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manage Tickets
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage and track all support tickets
            </p>
          </div>
          
          <button
            onClick={fetchTickets}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
             Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tickets</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{tickets.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Open</h3>
            <p className="text-2xl font-bold text-blue-600">
              {tickets.filter(t => t.status === 'Open').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</h3>
            <p className="text-2xl font-bold text-orange-600">
              {tickets.filter(t => t.status === 'In Progress').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved</h3>
            <p className="text-2xl font-bold text-green-600">
              {tickets.filter(t => t.status === 'Resolved').length}
            </p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className=" p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by:
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border  text-gray-500  border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
              >
                <option value="all">All Tickets</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="assigned">Assigned</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border   text-gray-500 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
              >
                <option value="createdAt">Date Created</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="category">Category</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className=" block text-sm font-medium  text-gray-700 dark:text-gray-300  mb-2">
                Order:
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border text-gray-500 border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredAndSortedTickets.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400">No tickets found matching your criteria.</p>
            </div>
          ) : (
            filteredAndSortedTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Ticket Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {ticket.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {ticket.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority || 'Medium'} Priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
                        {ticket.category}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <p>📧 Creator Name: {ticket.creatorInfo?.fullName || 'Unknown'}</p>
                       <p>📧 Creator Email: {ticket.creatorInfo?.email || 'Unknown'}</p>
                      <p>📅 Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                      <p>👤 Assigned to: {ticket.assignedTo || 'Unassigned'}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:ml-6 space-y-3">
                    {/* Status Change */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status:
                      </label>
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                        disabled={updatingTickets.has(ticket._id)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    {/* Assignment Actions */}
                    <div className="space-y-2">
                      {!ticket.assignedTo || ticket.assignedTo !== (currentUser.email || currentUser.uid) ? (
                        <button
                          onClick={() => handleAssign(ticket._id)}
                          disabled={updatingTickets.has(ticket._id)}
                          className="w-full bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {updatingTickets.has(ticket._id) ? 'Assigning...' : 'Assign to Me'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnassign(ticket._id)}
                          disabled={updatingTickets.has(ticket._id)}
                          className="w-full bg-gray-600 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
                        >
                          {updatingTickets.has(ticket._id) ? 'Unassigning...' : 'Unassign'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Show filtered count */}
        {filter !== 'all' && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredAndSortedTickets.length} of {tickets.length} tickets
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default AdminTicketsPage;