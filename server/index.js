require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const adminRoute = require("./Routes/adminRoute");
const productRoute = require("./Routes/ProductRoute");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(process.env.dbUrl).then(() => {
  console.log("DB connected");
});

// ---------Routes----------

app.use("/admin", adminRoute);
app.use("/product", productRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Run on ${port} Port`);
});
