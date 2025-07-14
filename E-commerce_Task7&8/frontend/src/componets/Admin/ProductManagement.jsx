import React from 'react';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  const products = [
    {
      _id: 12345,
      name: 'Shirt',
      price: '110',
      sku: '123123123',
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Delete Product with id:', id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Heading */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Product Management</h2>
        <p className="text-gray-500">Manage your store's product listings</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-100">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">SKU</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-block bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
