const express = require("express");
const router = express.Router();
const AdminController = require("../Controller/adminController");

router.post("/adminlogin", AdminController.AdminLogin);

module.exports = router;
