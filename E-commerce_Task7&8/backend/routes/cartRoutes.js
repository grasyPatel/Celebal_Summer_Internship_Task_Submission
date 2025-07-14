import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();



// Helper function to get cart by user or guest
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId: guestId });
  }
  return null;
};

router.post("/",  async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use userId from request body if provided, otherwise from JWT token
    const finalUserId = userId || req.user?._id;
    let cart = await getCart(finalUserId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // Product exists, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // New product variant
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // New cart
      const newCart = await Cart.create({
        user: finalUserId ? finalUserId : undefined,
        guestId: !finalUserId ? (guestId || "guest_" + new Date().getTime()) : undefined,
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0]?.url || "",
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(200).json(newCart);
    }
  } catch (err) {
    console.error("Cart Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// GET cart - get /api/cart
router.get("/",  async (req, res) => {
  try {
    const { guestId, userId } = req.query;
    
    const cart = await getCart(userId, guestId);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    res.json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update cart item  put api/cart
router.put("/",  async (req, res) => {
  try {
    const { productId , quantity, size, color, guestId, userId } = req.body;
   
   
    
    const cart = await getCart(userId, guestId);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    
    if (productIndex > -1) {
      if (quantity > 0) {
        // Remove item if quantity is 0 or negative
        cart.products[productIndex].quantity = quantity;
      } else {
        // Update quantity
        cart.products.splice(productIndex, 1);
      }
      
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE cart item /api/cart
router.delete("/",  async (req, res) => {
  try {
   
    const { productId, size, color, guestId, userId } = req.body;
    
    const cart = await getCart(userId, guestId);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      
      await cart.save();
      res.json({ message: "Item removed from cart", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Delete Cart Item Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST api/cart/merge
// Merge guest cart into user cart
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  
  try {
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        // Merge guest cart products into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });
        
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        
        await userCart.save();
        
        // Delete guest cart
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (err) {
          console.error("Error deleting guest cart:", err);
        }
        
        return res.json(userCart);
      } else {
        // No user cart exists, convert guest cart to user cart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.json(guestCart);
      }
    } else {
      // No guest cart found
      if (userCart) {
        return res.status(200).json(userCart);
      } else {
        return res.status(404).json({ message: "No cart found" });
      }
    }
  } catch (err) {
    console.error("Cart merge error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});
 

export default router;