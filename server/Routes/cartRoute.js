const express = require("express");
const router = express.Router();
const cartContorller = require("../Controller/cartController");
router.get("/cartLength/:userId", cartContorller.GetCartByUserId);
router.get("/GetCart/:userId", cartContorller.GetCart);
router.post("/AddToCart", cartContorller.AddToCart);
router.get("/DisplayCartData/:userId", cartContorller.DisplayCartData);
router.delete("/DeleteCartItem/:productId", cartContorller.DeleteCartItem);
router.put("/IncreaseQuantity/:productId", cartContorller.IncreaseQuantity);
router.put("/DecreaseQuantity/:productId", cartContorller.DecreaseQuantity);

module.exports = router;
