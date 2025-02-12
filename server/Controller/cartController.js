const cartModel = require("../Models/cartModel");
const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModel");
// Get cart length for a user
const GetCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId });

    if (!cart || !cart.products.length) {
      return res.status(200).json({ success: true, length: 0 });
    }

    res.status(200).json({ success: true, length: cart.products.length });
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

    res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully",
      products: cartItems.products,
    });
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID or Product ID" });
    }
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex((p) =>
      p.productId.equals(productId)
    );
    // checking if the product is already present or not
    //in JS , when a product is not found in an array using a method like findIndex() , it return -1
    if (productIndex > -1) {
      return res
        .status(200)
        .json({ success: false, msg: "Product already added" });
      // cart.products[productIndex].quantity += quantity;
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
    return res.status(200).json({
      success: true,
      msg: "Product added to cart successfully",
      cart,
    });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};
const DisplayCartData = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("user Id getting from frontend to backend : ", userId);
    if (userId) {
      const Data = await cartModel.find({ userId });
      if (!Data || !Data.length) {
        return res.status(200).json({ message: "Your cart is empty" });
      }

      res.status(200).json(Data);
      console.log("Backend Cart Data : ", Data);
    } else {
      res.status(400).json({ error: "User ID is required" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
};
const DeleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await cartModel.findOneAndUpdate(
      { "products.productId": productId },
      // $pull is a mongoo Db operator use to delete item
      { $pull: { products: { productId: productId } } },
      { new: true }
    );
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Product not found in the cart." });
    }

    res.status(200).json({ message: "Item removed successfully!", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Failed to remove item from cart." });
  }
};
const IncreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await cartModel.findOneAndUpdate(
      { "products.productId": productId },
      // $inc is  a mongo Db operator use to increase or decrease the value of a numeric field in a document
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );
    res.status(200).json({ msg: "Quantity increased!", cart });
  } catch (error) {
    res.status(500).json({ msg: "Failed to increase quantity" });
  }
};
const DecreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Product id to decrease : ", productId);

    const cart = await cartModel.findOneAndUpdate(
      // $gt stands for greater then  it is a mongo DB operator It is used to match document where the specified field's value is greater than a given value
      { "products.productId": productId },
      // elem target the exact product of the array which we want to decrease
      { $inc: { "products.$[elem].quantity": -1 } },
      {
        new: true,
        arrayFilters: [
          {
            "elem.productId": productId,
            "elem.quantity": { $gt: 1 },
          },
        ],
      }
    );

    if (!cart) {
      return res.status(400).json({ msg: "Quantity cannot be less than 1" });
    }

    res.status(200).json({ msg: "Quantity decreased!", cart });
  } catch (error) {
    res.status(500).json({ msg: "Failed to decrease quantity" });
  }
};

module.exports = {
  AddToCart,
  GetCartByUserId,
  GetCart,
  DisplayCartData,
  DeleteCartItem,
  IncreaseQuantity,
  DecreaseQuantity,
};
