const cartModel = require("../Models/cartModel");
const mongoose = require("mongoose");
// Get cart length for a user
const GetCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId });

    if (!cart || !cart.products.length) {
      return res.status(200).json({ length: 0 });
    }

    res.status(200).json({ length: cart.products.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
};

const GetCart = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const cartItems = await cartModel
      .findOne({ userId })
      .populate("products.productId");

    if (!cartItems || !cartItems.products.length) {
      return res.status(200).json({ message: "Cart is empty", products: [] });
    }

    res.status(200).json(cartItems.products);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error while fetching cart." });
  }
};

// Add a product to the cart
const AddToCart = async (req, res) => {
  try {
    const {
      userId,
      productId,
      productName,
      productPrice,
      quantity = 1,
      productImage,
    } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ error: "Invalid User ID or Product ID" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) =>
      p.productId.equals(productId)
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId,
        productName,
        productPrice,
        quantity,
        productImage,
      });
    }

    await cart.save();
    res.status(200).json({ cart, length: cart.products.length });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

module.exports = {
  AddToCart,
  GetCartByUserId,
  GetCart,
};
