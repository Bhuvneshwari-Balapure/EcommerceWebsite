const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userMobile: Number,
  userPass: String,
  ConfirmPass: String,
});
module.exports = mongoose.model("user", UserSchema);
