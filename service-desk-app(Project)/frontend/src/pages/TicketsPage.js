import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SidebarLayout from '../components/SidebarLayout';
import axios from 'axios';

const TicketsPage = () => {
  const { currentUser, role } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Advanced filtering states
  const [filters, setFilters] = useState({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    categoryFilter: 'all',
    priorityFilter: 'all',
    statusFilter: 'all',
    dateFrom: '',
    dateTo: '',
    searchText: ''
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = ['General', 'Technical', 'Billing', 'Feature Request', 'Bug Report'];
  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

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
  setIsLoading(true);

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/tickets`, {
      title,
      description,
      category,
      priority,
      createdBy: currentUser.uid,
    });

    const newTicket = res.data;

    setTickets(prev => [newTicket, ...prev]);
    setTitle('');
    setDescription('');
    setCategory('General');
    setPriority('Medium');
    setShowCreateForm(false);
  } catch (err) {
    console.error('Failed to create ticket:', err);
    alert('Something went wrong while creating the ticket.');
  } finally {
    setIsLoading(false);
  }
};


  const applyFilters = () => {
    let filtered = [...tickets];

    // Text search filter
    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categoryFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === filters.categoryFilter);
    }

    // Priority filter
    if (filters.priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priorityFilter);
    }

    // Status filter
    if (filters.statusFilter !== 'all') {
      filtered = filtered.filter(ticket => 
        (ticket.status || 'Open').toLowerCase() === filters.statusFilter.toLowerCase()
      );
    }

    // Date range filter
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(ticket => new Date(ticket.createdAt) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // Include the entire day
      filtered = filtered.filter(ticket => new Date(ticket.createdAt) <= toDate);
    }

    // Apply sorting
    filtered = sortTickets(filtered, filters.sortBy, filters.sortOrder);
    
    setFilteredTickets(filtered);
  };

  const sortTickets = (list, sortBy, sortOrder = 'desc') => {
    const sorted = [...list].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'status':
          comparison = (a.status || 'Open').localeCompare(b.status || 'Open');
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'createdAt':
        default:
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return sorted;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      sortOrder: 'desc',
      categoryFilter: 'all',
      priorityFilter: 'all',
      statusFilter: 'all',
      dateFrom: '',
      dateTo: '',
      searchText: ''
    });
  };

  const getDefaultDateRange = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    return {
      from: thirtyDaysAgo.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0]
    };
  };

  const setDefaultDateRange = () => {
    const defaultRange = getDefaultDateRange();
    setFilters(prev => ({
      ...prev,
      dateFrom: defaultRange.from,
      dateTo: defaultRange.to
    }));
  };

  useEffect(() => {
    if (currentUser) fetchTickets();
  }, [currentUser]);

  useEffect(() => {
    applyFilters();
  }, [tickets, filters]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in progress': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SidebarLayout >
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Tickets</h1>
          <p className="text-blue-100">Create and track your support requests</p>
        </div>

        {/* Create Ticket Button */}
        {role !== 'admin' && !showCreateForm && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Ticket
            </button>
          </div>
        )}

        {/* Create Ticket Modal */}
        {role !== 'admin' && showCreateForm && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Ticket
                  </h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-transparent  text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className=" bg-transparent  text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {priorities.map(pri => (
                        <option key={pri} value={pri}>{pri}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide detailed information about your issue..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreate}
                    disabled={isLoading || !title.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Ticket
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Filters Panel */}
        <div className=" rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className=" px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold  flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters & Search
              </h2>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
              >
                {showAdvancedFilters ? 'Hide Filters' : 'Show Advanced Filters'}
                <svg className={`w-4 h-4 ml-1 transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Basic Search */}
            <div className="mb-4">
              <div className="relative">
                <svg className="bg-transparent absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tickets by title or description..."
                  value={filters.searchText}
                  onChange={(e) => handleFilterChange('searchText', e.target.value)}
                  className="bg-transparent w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 rounded-lg border border-gray-200">
    
    {/* Category Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-2">Category</label>
      <select
        value={filters.categoryFilter}
        onChange={(e) => handleFilterChange('categoryFilter', e.target.value)}
        className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {/* Priority Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-2">Priority</label>
      <select
        value={filters.priorityFilter}
        onChange={(e) => handleFilterChange('priorityFilter', e.target.value)}
        className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Priorities</option>
        {priorities.map(pri => (
          <option key={pri} value={pri}>{pri}</option>
        ))}
      </select>
    </div>

    {/* Status Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
      <select
        value={filters.statusFilter}
        onChange={(e) => handleFilterChange('statusFilter', e.target.value)}
        className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Statuses</option>
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>

    {/* Empty placeholder to keep layout aligned */}
    <div></div>

    {/* Date Range */}
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-500 mb-2">Date Range</label>
      <div className="flex space-x-2">
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          className="text-gray-700 flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="flex items-center text-gray-500">to</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          className="text-gray-700 flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-between space-x-2 mt-2">
        <button
          onClick={setDefaultDateRange}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          Last 30 Days
        </button>
        <button
          onClick={() => {
            handleFilterChange('dateFrom', '');
            handleFilterChange('dateTo', '');
          }}
          className="ml-auto px-3 py-1 text-xs bg-red-400 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          Clear Dates
        </button>
      </div>
    </div>

    {/* Reset Button - full width on small screens, right-aligned on large */}
    <div className="md:col-span-2 lg:col-span-4 flex justify-end items-end">
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
      >
        Reset All Filters
      </button>
    </div>
  </div>
)}


            {/* Active Filters Summary */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.categoryFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Category: {filters.categoryFilter}
                  <button
                    onClick={() => handleFilterChange('categoryFilter', 'all')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.priorityFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Priority: {filters.priorityFilter}
                  <button
                    onClick={() => handleFilterChange('priorityFilter', 'all')}
                    className="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.statusFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Status: {filters.statusFilter}
                  <button
                    onClick={() => handleFilterChange('statusFilter', 'all')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {(filters.dateFrom || filters.dateTo) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Date: {filters.dateFrom || '...'} to {filters.dateTo || '...'}
                  <button
                    onClick={() => {
                      handleFilterChange('dateFrom', '');
                      handleFilterChange('dateTo', '');
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className=" rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className=" px-6 py-4 border-b border-gray-200">
            <h2 className="text-3xl font-bold  flex items-center">
              <svg className="w-5 h-5 mr-2 bg-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Tickets ({filteredTickets.length} of {tickets.length})
            </h2>
          </div>

          <div className="p-6"> 
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {tickets.length === 0 ? 'No tickets found' : 'No tickets match your filters'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {tickets.length === 0 
                    ? 'Create your first support ticket to get started.' 
                    : 'Try adjusting your search criteria or filters.'
                  }
                </p>
                {tickets.length === 0 && role !== 'admin' && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Ticket
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className=" border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold  mb-2">
                          {ticket.title}
                        </h3>
                        <p className=" mb-3 line-clamp-2 text-gray-500">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status || 'Open')}`}>
                          {ticket.status || 'Open'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm ">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {ticket.category}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                        {role === 'admin' && (
                          <button className="text-green-600 hover:text-green-800 font-medium">
                            Update Status
                          </button>
                        )}
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
    </SidebarLayout>
  );
};

export default TicketsPage;