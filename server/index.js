require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
// ---------Routes----------
const adminRoute = require("./Routes/adminRoute");
const productRoute = require("./Routes/ProductRoute");
const UserRoute = require("./Routes/UserRoute");
const CartRoute = require("./Routes/cartRoute.js");
const PaymentRoute = require("./Routes/paymentRoute.js");
// ------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// mongoose.connect(process.env.dbUrl).then(() => {
//   console.log("DB connected");
// });

mongoose
  .connect(process.env.dbUrl)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ---------Routes----------

app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/Images", express.static("Images"));
app.use("/users", UserRoute);
app.use("/Cart", CartRoute);
app.use("/api/payment", PaymentRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Run on ${port} Port`);
});
