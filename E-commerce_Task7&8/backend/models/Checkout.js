import mongoose from 'mongoose';


const CheckoutItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  }
});



const CheckoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkoutItems: {
    type: [CheckoutItemSchema],
    required: true
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  paymentStatus: {
    type: String
  },
  paymentDetails: {
    type:mongoose.Schema.Types.Mixed
  },

  isFinalized: {
    type: Boolean,
    default: false
  },
  finalizedAt: {
    type: Date
  }
}, {
  timestamps: true // createdAt and updatedAt
});

const Checkout = mongoose.model('Checkout', CheckoutSchema);

export default Checkout;

