const ProductModel = require("../Models/ProductModel");

const CreateProduct = async (req, res) => {
  try {
    // Validate request body and files
    if (
      !req.body.productName ||
      !req.body.productCategory ||
      !req.body.productPrice ||
      !req.body.productQuantity ||
      !req.body.productDescription
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image file is required." });
    }

    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const imageUrls = req.files.map((file) => file.path);

    const product = await ProductModel.create({
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      productImg: imageUrls,
      defaultImage: imageUrls[0],
      productDescription: req.body.productDescription,
    });

    console.log("Created Product:", product);
    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    console.error("Error creating product:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

const DisplayProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};
const ProductDetail = async (req, res) => {
  const product = await ProductModel.findById(req.body.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).send(product);
};

const DisplaySpecificProduct = async (req, res) => {
  const { productCategory } = req.query;

  const Data = await ProductModel.find({ productCategory: productCategory });
  res.send({ Data });
};

const AdminDisplayProduct = async (req, res) => {
  try {
    const Data = await ProductModel.find();
    res.status(200).send({ Data });
    console.log("Backend Data : ", Data);
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch Data", error: error.message });
  }
};
const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Product Deleted Successfully..." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  CreateProduct,
  DisplayProduct,
  ProductDetail,
  DisplaySpecificProduct,
  AdminDisplayProduct,
  DeleteProduct,
};
