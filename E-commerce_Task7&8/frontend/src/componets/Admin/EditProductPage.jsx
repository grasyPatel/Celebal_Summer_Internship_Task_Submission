import React, { useState } from 'react';

const EditProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: '',
    images: [
      { url: 'https://picsum.photos/400/500?random=1', file: null },
      { url: 'https://picsum.photos/400/500?random=2', file: null },
      { url: 'https://picsum.photos/400/500?random=3', file: null },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...product.images];
        newImages[index] = {
          url: event.target.result,
          file: file
        };
        setProduct((prev) => ({
          ...prev,
          images: newImages
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct((prev) => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageSlot = () => {
    if (product.images.length < 10) { // Limit to 10 images
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, { url: '', file: null }]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const formData = new FormData();
    
    // Add all product fields
    Object.keys(product).forEach(key => {
      if (key !== 'images') {
        formData.append(key, product[key]);
      }
    });
    
    // Add image files
    product.images.forEach((image, index) => {
      if (image.file) {
        formData.append(`images`, image.file);
      } else if (image.url && !image.url.startsWith('data:')) {
        // For existing images (URLs), you might want to handle differently
        formData.append(`existingImages`, image.url);
      }
    });

    console.log('Submitting product:', product);
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Example API call (uncomment and modify as needed)
    /*
    fetch('/api/products/update', {
      method: 'PUT',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
    */
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className=" mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Product</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
                placeholder="Product name"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">SKU</label>
              <input
                name="sku"
                value={product.sku}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
                placeholder="Stock Keeping Unit"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Count In Stock</label>
              <input
                type="number"
                name="countInStock"
                value={product.countInStock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Category</label>
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Brand</label>
              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Collection</label>
              <input
                name="collections"
                value={product.collections}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Material</label>
              <input
                name="material"
                value={product.material}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={product.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none"
              >
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
               
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all outline-none resize-none"
                placeholder="Write product description here..."
              />
            </div>

            <div>
              <label className="block mb-4 font-medium text-gray-700">Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                      {img.url ? (
                        <img
                          src={img.url}
                          alt={`Product ${idx}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Upload button */}
                    <label className="absolute inset-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, idx)}
                        className="hidden"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </label>
                    
                    {/* Remove button */}
                    {img.url && (
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                {/* Add more images button */}
                {product.images.length < 10 && (
                  <button
                    onClick={addImageSlot}
                    className="w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click on any image to upload a new one. Maximum 10 images allowed. Size limit: 5MB per image.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;