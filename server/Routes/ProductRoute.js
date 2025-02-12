// const express = require("express");
// //multer =  helps handle file upload in server
// const multer = require("multer");
// // path = Used to handle file path
// const path = require("path");
// const router = express.Router();
// const ProductController = require("../Controller/ProductController");

// // configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb = callback function
//     // where to save the uploaded file
//     cb(null, "Images/"); //the null arguement indicates there's no error and Images = folder name where the file should be saved.
//   },

//   filename: (req, file, cb) => {
//     //unique file name
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // File filter for allowed extensions (optional)
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /jpeg|jpg|png|pdf/;
//   const extname = allowedFileTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedFileTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
//   }
// };
// // Initialize Multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
// });
// router.post(
//   "/createProduct",
//   upload.array("productImg", 10),
//   ProductController.CreateProduct
// );
// router.get("/DisplayProduct", ProductController.DisplayProduct);
// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const ProductController = require("../Controller/ProductController");

const IMAGES_DIR = "Images/";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for allowed extensions (optional)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Route for creating a product
router.post(
  "/createProduct",
  upload.array("productImg", 10), // Accept up to 10 files
  (err, req, res, next) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  },
  ProductController.CreateProduct
);

// Route for displaying products
router.get("/DisplayProduct", ProductController.DisplayProduct);
router.post("/ProductDetail", ProductController.ProductDetail);
router.get("/DisplaySpecificProduct", ProductController.DisplaySpecificProduct);

module.exports = router;
