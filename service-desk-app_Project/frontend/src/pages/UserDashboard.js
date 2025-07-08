import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  User,
  BarChart3,
  Unlock,
  Zap,
  CheckCircle,
  FileText,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Mail,
  Calendar,
  UserCheck,
  Hash,
  Eye,
  Edit3,
  MessageSquare,
  X,
  Send,
} from "lucide-react";

const UserDashboard = () => {
  const { currentUser, role } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  
 
  const [updateForm, setUpdateForm] = useState({
    title: "",
    description: "",
    priority: "",
    category: ""
  });
  const [newComment, setNewComment] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUserTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE}/api/tickets`,
        {
          params: { uid: currentUser.uid, role },
        }
      );
      console.log("Tickets for users:", res.data);
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching user tickets:", err);
      setError("Failed to load your tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserTickets();
    }
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "in-progress":
      case "in progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "resolved":
      case "closed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
     
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter((t) => t.status?.toLowerCase() === "open").length,
      inProgress: tickets.filter((t) =>
        ["in-progress", "in progress"].includes(t.status?.toLowerCase())
      ).length,
      resolved: tickets.filter((t) =>
        ["resolved", "closed"].includes(t.status?.toLowerCase())
      ).length,
    };
    return stats;
  };

  
  const openDetailsModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const openUpdateModal = (ticket) => {
    setSelectedTicket(ticket);
    setUpdateForm({
      title: ticket.title || "",
      description: ticket.description || "",
      priority: ticket.priority || "",
      category: ticket.category || ""
    });
    setShowUpdateModal(true);
  };

  const openCommentModal = (ticket) => {
    setSelectedTicket(ticket);
    setNewComment("");
    setShowCommentModal(true);
  };

  const closeAllModals = () => {
    setShowDetailsModal(false);
    setShowUpdateModal(false);
    setShowCommentModal(false);
    setSelectedTicket(null);
    setUpdateForm({ title: "", description: "", priority: "", category: "" });
    setNewComment("");
  };

  
  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      setActionLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE}/api/tickets/${selectedTicket._id}`,
        updateForm
      );
      
    
      setTickets(tickets.map(ticket => 
        ticket._id === selectedTicket._id ? res.data : ticket
      ));
      
      closeAllModals();
      setError("");
    } catch (err) {
      console.error("Error updating ticket:", err);
      setError("Failed to update ticket. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!selectedTicket || !newComment.trim()) return;

    try {
      setActionLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/api/tickets/${selectedTicket._id}/comments`,
        { 
          comment: newComment,
          createdBy: currentUser.uid,
          userEmail: currentUser.email,
          userName: currentUser.displayName || currentUser.email
        }
      );
      
      
      setTickets(tickets.map(ticket => 
        ticket._id === selectedTicket._id ? res.data : ticket
      ));
      
      closeAllModals();
      setError("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const stats = getTicketStats();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
       
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {currentUser?.displayName || "User"}!
          </h1>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
                <div className="space-y-1 text-white/90">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {currentUser?.displayName || "Not provided"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {currentUser?.email}
                  </p>
                  <p>
                    <span className="font-medium">Role:</span> User
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Tickets
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <BarChart3
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Open
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.open}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Unlock
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  In Progress
                </p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.inProgress}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Zap
                  size={24}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Resolved
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.resolved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FileText size={28} />
                  My Support Tickets
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track and manage all your support requests
                </p>
              </div>
              <button
                onClick={fetchUserTickets}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <RefreshCw size={20} />
                )}
                <span>{loading ? "Loading..." : "Refresh"}</span>
              </button>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6 flex items-center space-x-2">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <Loader2 size={48} className="animate-spin text-blue-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Loading your tickets...
                </p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <Mail size={64} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No tickets yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  You haven't created any support tickets yet. When you do,
                  they'll appear here for easy tracking.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                            {ticket.title}
                          </h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {ticket.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.status || "Unknown"}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority || "Normal"} Priority
                          </span>
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                            {ticket.category || "General"}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>
                              Created:{" "}
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <UserCheck size={16} />
                            <span>
                              Assigned: {ticket.assignedTo || "Unassigned"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                          <Hash size={12} />
                          <span>{ticket._id}</span>
                        </div>
                        
                      
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openDetailsModal(ticket)}
                            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1 text-sm"
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                          
                          <button
                            onClick={() => openUpdateModal(ticket)}
                            className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1 text-sm"
                          >
                            <Edit3 size={16} />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => openCommentModal(ticket)}
                            className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1 text-sm"
                          >
                            <MessageSquare size={16} />
                            <span>Comment</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showDetailsModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ticket Details
              </h2>
              <button
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedTicket.title}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedTicket.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status || "Unknown"}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority || "Normal"}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedTicket.category || "General"}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assigned To
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedTicket.assignedTo || "Unassigned"}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Created
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
              </div>
              
              {selectedTicket.comments && selectedTicket.comments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comments ({selectedTicket.comments.length})
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedTicket.comments.map((comment, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white">{comment.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            By: {comment.userName || comment.userEmail || 'Unknown User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Update Ticket
              </h2>
              <button
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateTicket} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm({...updateForm, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={updateForm.description}
                  onChange={(e) => setUpdateForm({...updateForm, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={updateForm.priority}
                    onChange={(e) => setUpdateForm({...updateForm, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm({...updateForm, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {actionLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Edit3 size={16} />
                  )}
                  <span>{actionLoading ? "Updating..." : "Update"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCommentModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add Comment
              </h2>
              <button
                onClick={closeAllModals}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddComment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ticket: {selectedTicket.title}
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {selectedTicket.description}
                </p>
                
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Comment
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  placeholder="Enter your comment here..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !newComment.trim()}
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {actionLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  <span>{actionLoading ? "Adding..." : "Add Comment"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
              