import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import YouMayProduct from "./YouMayProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { userId, guestId, user } = useSelector((state) => state.auth);

  const productFetchId = productId || id;
  const product = selectedProduct;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
    }
  }, [productId, product]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error(`Please select size and color for ${product.name}`, {
        duration: 1000,
      });
      return;
    }

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        userId: user?._id,
        guestId,
      })
    )
      .then(() => {
        toast.success("Product added to cart", { duration: 1000 });
      })
      .catch(() => {
        toast.error("Failed to add product to cart", { duration: 1000 });
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="w-full">
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
        {/* Images */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Thumb ${i + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  selectedImage?.url === img.url ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage?.url}
              alt="Selected Product"
              className="w-full h-[450px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm">{product.description}</p>

          <div className="flex items-center gap-4">
            {product.discountPrice && (
              <p className="text-lg text-gray-500 line-through">
                ${product.price?.toFixed(2)}
              </p>
            )}
            <p className="text-xl font-semibold text-gray-800">
              ${product.discountPrice?.toFixed(2) || product.price?.toFixed(2)}
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-3 items-center">
              <span className="text-sm font-medium">Color:</span>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-3 items-center">
              <span className="text-sm font-medium">Size:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "text-gray-700 border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* Product Details */}
          {product.characteristics && Object.keys(product.characteristics).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded">
                <tbody>
                  {Object.entries(product.characteristics).map(([key, value]) => (
                    <tr key={key} className="border-t border-gray-200">
                      <th className="p-2 font-medium w-1/3 bg-gray-50">{key}</th>
                      <td className="p-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <YouMayProduct products={similarProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
