const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  customerid: String,
  customername: String,
  productname: String,
  amount: Number,
  address: String,
  email: String,
  mobile: String,
  pincode: String,
});

module.exports = mongoose.model("order", orderSchema);
