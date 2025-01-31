const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  adminId: String,
  adminPass: String,
});

module.exports = mongoose.model("admin", adminSchema);
