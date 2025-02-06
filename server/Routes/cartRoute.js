const express = require("express");
const router = express.Router();
const cartContorller = require("../Controller/cartController");
router.get("/cartLength/:userId", cartContorller.GetCartByUserId);
router.get("/GetCart/:userId", cartContorller.GetCart);
router.post("/AddToCart", cartContorller.AddToCart);

module.exports = router;
