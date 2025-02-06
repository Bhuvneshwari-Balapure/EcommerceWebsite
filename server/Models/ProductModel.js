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
    productPrice: { type: Number, required: true, min: 0 },
    productQuantity: { type: Number, required: true, min: 0, default: 0 },
    productImg: { type: [String], required: true },
    defaultImage: { type: String, required: true },
    productDescription: { type: String, required: true },
  },
  { timestamps: true }
);

ProductSchema.index({ productName: 1 });
ProductSchema.index({ productCategory: 1 });

module.exports = mongoose.model("Product", ProductSchema);
