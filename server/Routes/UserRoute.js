const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");
router.post("/createUser", userController.CreateUser);
router.post("/LoginUser", userController.LoginUser);
module.exports = router;
