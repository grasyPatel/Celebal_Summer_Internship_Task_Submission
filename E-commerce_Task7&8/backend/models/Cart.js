import mongoose from "mongoose";

// CartItem Schema - Nested inside products array
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String },
  image: { type: String },
  price: { type: String },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number, default: 1 },
},
{_id: false}
);

// Main Cart Schema
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: {
      type: [cartItemSchema],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
