import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;
    if (!name || !email || !password) return;
    setUsers((prev) => [...prev, { name, email, role }]);
    setFormData({ name: '', email: '', password: '', role: 'customer' });
  };

  const handleDelete = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole;
    setUsers(updatedUsers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Heading */}
        <div className=" py-8">
          <h1 className="text-4xl font-bold mb-2">
            User Management
          </h1>
          <p className="text-gray-600">Manage your users and their permissions</p>
        </div>

        {/* Add New User Form */}
        <form onSubmit={handleAddUser} className="">
        <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <button
                type='submit'
                className="bg-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
        </form>
        

        {/* Users Table */}
        <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(index, e.target.value)}
                        className="border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-white bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <p className="text-lg font-medium">No users found</p>
                        <p className="text-sm">Add your first user to get started</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;