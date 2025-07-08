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
} from "lucide-react";

const UserDashboard = () => {
  const { currentUser, role } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
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

  const stats = getTicketStats();

  return (
    <div className="min-h-screen
    ">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {currentUser?.displayName || "User"}!
          </h1>
        </div>

        {/* Profile Card */}
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

        {/* Stats Overview */}
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


                          
                          <div className="text-gray-400 flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>
                              Created:{" "}
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                         
                          <div className=" text-gray-400 flex items-end space-x-2 ">
                            <UserCheck size={16} />
                            <span>
                              Assigned: {ticket.assignedTo || "Unassigned"}
                            </span>
                          </div>
                       
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                          <Hash size={12} />
                          <span>{ticket._id}</span>
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
    </div>
  );
};

export default UserDashboard;
