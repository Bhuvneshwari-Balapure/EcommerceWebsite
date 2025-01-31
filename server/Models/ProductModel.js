// const mongoose = require("mongoose");
// const ProductSchema = new mongoose.Schema({
//   productName: { type: String, required: true },
//   productCategory: { type: String, required: true },
//   productPrice: Number,
//   productQuantity: Number,
//   productImg: [String],
//   defaultImage: String,
//   productDescription: String,
// });

// module.exports = mongoose.model("product", ProductSchema);

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productPrice: { type: Number, required: true, min: 0 }, // Ensure price is non-negative
    productQuantity: { type: Number, required: true, min: 0, default: 0 }, // Default to 0
    productImg: { type: [String], required: true }, // Ensure at least one image is provided
    defaultImage: { type: String, required: true }, // Ensure a default image is provided
    productDescription: { type: String, required: true }, // Ensure description is provided
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Optional: Add indexes for better query performance
ProductSchema.index({ productName: 1 });
ProductSchema.index({ productCategory: 1 });

module.exports = mongoose.model("Product", ProductSchema);
