import { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from 'recharts';
import { RefreshCw, Users, Ticket, Clock, CheckCircle, AlertCircle, TrendingUp, Menu, X,  FileText,  BarChart3 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  
  const [stats, setStats] = useState({
    totalTickets: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    users: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const [recentTickets, setRecentTickets] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiBase = process.env.REACT_APP_API_BASE;

      const ticketsRes = await axios.get(`${apiBase}/api/tickets`, {
        params: { role: 'admin' },
      });
      console.log("Dashboard - Tickets:", ticketsRes.data);
      const tickets = Array.isArray(ticketsRes.data) ? ticketsRes.data : ticketsRes.data.tickets || [];

      let users = [];
      try {
        const usersRes = await axios.get(`${apiBase}/api/users`);
        console.log("Dashboard - Users:", usersRes.data);
        users = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.users || [];
        setUsers(users); 
      } catch (userErr) {
        console.warn('Failed to fetch users:', userErr);
      }

      const processedStats = {
        totalTickets: tickets.length,
        open: tickets.filter(t => t.status === 'Open').length,
        inProgress: tickets.filter(t => t.status === 'In Progress').length,
        resolved: tickets.filter(t => t.status === 'Resolved').length,
        users: users.filter(u => 
          !u.role || ['user', 'User', 'customer'].includes(u.role)
        ).length,
        admins: users.filter(u => 
          ['admin', 'Admin', 'administrator'].includes(u.role)
        ).length,
      };

      console.log("Dashboard - Processed Stats:", processedStats);

      setStats(processedStats);
      setRecentTickets(tickets.slice(0, 5));
      setLastUpdated(new Date());

    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(`Failed to load dashboard data: ${err.message}`);
      setStats({
        totalTickets: 0,
        open: 0,
        inProgress: 0,
        resolved: 0,
        users: 0,
        admins: 0,
      });
      setRecentTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleManageUsers = () => {
    setShowUserManagement(true);
    setShowReports(false);
   
  };

  const handleViewReports = () => {
    setShowReports(true);
    setShowUserManagement(false);
    
  };

  
  const handleUserRoleChange = async (userId, newRole) => {
    try {
      setLoadingUsers(true);
      const apiBase = process.env.REACT_APP_API_BASE;
      await axios.put(`${apiBase}/api/users/${userId}`, { role: newRole });
      
      const usersRes = await axios.get(`${apiBase}/api/users`);
      const updatedUsers = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.users || [];
      setUsers(updatedUsers);
      
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update user role:', err);
      setError('Failed to update user role');
    } finally {
      setLoadingUsers(false);
    }
  };

  const generateReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      totalTickets: stats.totalTickets,
      openTickets: stats.open,
      inProgressTickets: stats.inProgress,
      resolvedTickets: stats.resolved,
      totalUsers: stats.users,
      totalAdmins: stats.admins,
      recentTickets: recentTickets.map(ticket => ({
        id: ticket.id || ticket._id,
        title: ticket.title || ticket.subject,
        status: ticket.status,
        priority: ticket.priority,
        creator: ticket.creatorInfo?.email,
        createdAt: ticket.createdAt
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [useMockData]);

  const ticketStatusData = [
    { name: 'Open', value: stats.open, color: '#3B82F6' },
    { name: 'In Progress', value: stats.inProgress, color: '#F59E0B' },
    { name: 'Resolved', value: stats.resolved, color: '#10B981' },
  ];

  const chartData = [
    { name: 'Open', count: stats.open },
    { name: 'In Progress', count: stats.inProgress },
    { name: 'Resolved', count: stats.resolved },
  ];

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-lg">Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="lg:hidden shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-md hover:bg-gray-100 hover:text-black"
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
      
        {showMobileMenu && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Last updated:</span>
              <span>
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchDashboardData}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div className="hidden lg:flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Monitor your system's performance and activities</p>
          </div>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            
            <button
              onClick={fetchDashboardData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <DashboardCard 
            title="Total Tickets" 
            count={stats.totalTickets} 
            color="bg-indigo-500" 
            icon={<Ticket className="h-5 w-5 lg:h-6 lg:w-6" />}
            trend="+12%"
          />
          <DashboardCard 
            title="Open" 
            count={stats.open} 
            color="bg-blue-500" 
            icon={<AlertCircle className="h-5 w-5 lg:h-6 lg:w-6" />}
            trend="+5%"
          />
          <DashboardCard 
            title="In Progress" 
            count={stats.inProgress} 
            color="bg-yellow-500" 
            icon={<Clock className="h-5 w-5 lg:h-6 lg:w-6" />}
            trend="-2%"
          />
          <DashboardCard 
            title="Resolved" 
            count={stats.resolved} 
            color="bg-green-500" 
            icon={<CheckCircle className="h-5 w-5 lg:h-6 lg:w-6" />}
            trend="+18%"
          />
          <DashboardCard 
            title="Users" 
            count={stats.users} 
            color="bg-gray-500" 
            icon={<Users className="h-5 w-5 lg:h-6 lg:w-6" />}
            trend="+3%"
          />
          <DashboardCard 
            title="Admins" 
            count={stats.admins} 
            color="bg-purple-500" 
            icon={<Users className="h-5 w-5 lg:h-6 lg:w-6" />}
            trend="0%"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-transparent p-4 lg:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Ticket Status Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-transparent p-4 lg:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                  labelStyle={{ fontSize: '12px' }}
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl shadow-sm border">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-3xl font-semibold">Recent Tickets</h3>
            <p className="text-sm">Latest support tickets and their status</p>
          </div>
          
          <div className="lg:hidden">
            {recentTickets && recentTickets.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id || ticket._id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {ticket.title || ticket.subject || 'No Title'}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          #{ticket.id || ticket._id || 'N/A'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`}>
                          {ticket.status || 'Unknown'}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority || 'Medium'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>👤 {ticket.creatorInfo?.email || 'Unknown'}</span>
                      <span>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                {loading ? 'Loading tickets...' : 'No tickets found'}
              </div>
            )}
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="divide-x divide-gray-200">
                <tr className="divide-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTickets && recentTickets.length > 0 ? (
                  recentTickets.map((ticket) => (
                    <tr key={ticket.id || ticket._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        #{ticket.id || ticket._id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {ticket.title || ticket.subject || 'No Title'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {ticket.creatorInfo?.email || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`}>
                          {ticket.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority || 'Medium'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      {loading ? 'Loading tickets...' : 'No tickets found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 lg:p-6 rounded-xl shadow-sm border">
          <h3 className="text-3xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 w-full">
            <button 
              onClick={handleManageUsers}
              className="p-3 lg:p-4 border  hover:text-black border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-all duration-200 group"
            >
              <Users className="h-5 w-5 lg:h-6 lg:w-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs lg:text-sm  font-medium">Manage Users</span>
            </button>
            <button 
              onClick={handleViewReports}
              className="p-3 lg:p-4 border  hover:text-black border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 group"
            >
              <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs lg:text-sm   font-medium">View Reports</span>
            </button>
            
          </div> 
        </div>

        {showUserManagement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-100 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-black font-bold">User Management</h2>
                <button
                  onClick={() => setShowUserManagement(false)}
                  className="p-2  border-gray-500 hover:bg-gray-500 rounded-lg"
                >
                  <X className="h-5 w-5 text-black " />
                </button>
              </div>
              
              <div className="space-y-4">
                {users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-black">
                      <thead>
                        <tr className="bg-gray-400">
                          <th className="border text-black border-black px-4 py-2 text-left">Email</th>
                          <th className="border text-black border-black px-4 py-2 text-left">Role</th>
                          <th className="border text-black border-black px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id || user._id} className="hover:bg-gray-50">
                            <td className="border text-black border-black px-4 py-2">{user.email}</td>
                            <td className="border text-black border-black px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                ['admin', 'Admin', 'administrator'].includes(user.role) 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role || 'User'}
                              </span>
                            </td>
                            <td className="border text-black border-black px-4 py-2">
                              <select
                                value={user.role || 'user'}
                                onChange={(e) => handleUserRoleChange(user.id || user._id, e.target.value)}
                                className="bg-blue-400 text-whitepx-2 py-1 border-none rounded text-sm"
                                disabled={loadingUsers}
                              >
                                <option  value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No users found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {showReports && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-100 rounded-xl p-6 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-black font-bold">System Reports</h2>
                <button
                  onClick={() => setShowReports(false)}
                  className="p-2 hover:bg-gray-500 rounded-lg"
                >
                  <X className="h-5 w-5 text-black" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Ticket Summary</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      Total: {stats.totalTickets} | Open: {stats.open} | Resolved: {stats.resolved}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">User Statistics</h3>
                    <p className="text-sm text-green-600 mt-1">
                      Users: {stats.users} | Admins: {stats.admins}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Recent Activity</h3>
                  <ul className="text-sm space-y-1 text-black">
                    <li>• {stats.resolved} tickets resolved this period</li>
                    <li>• {stats.open} tickets currently open</li>
                    <li>• {stats.inProgress} tickets in progress</li>
                  </ul>
                </div>
                
                <button
                  onClick={generateReport}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Download Full Report
                </button>
              </div>
            </div>
          </div>
        )}

       
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, color, icon, trend }) => (
  <div className={`p-3 lg:p-6 rounded-xl shadow-sm ${color} relative overflow-hidden`}>
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h3 className="text-xs lg:text-sm font-medium opacity-90 truncate">{title}</h3>
        <p className="text-xl lg:text-3xl font-bold mt-1 lg:mt-2">{count}</p>
        {trend && (
          <div className="flex items-center mt-1 lg:mt-2">
            <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
            <span className="text-xs lg:text-sm opacity-90">{trend}</span>
          </div>
        )}
      </div>
      <div className="opacity-80 ml-2">
        {icon}
      </div>
    </div>
    <div className="absolute top-0 right-0 -mt-2 lg:-mt-4 -mr-2 lg:-mr-4 h-8 w-8 lg:h-16 lg:w-16 rounded-full bg-white opacity-10"></div>
  </div>
);

export default AdminDashboard;