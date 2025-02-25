import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRupeeSign, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          "https://ecommercewebsite-2-snc8.onrender.com/product/DisplayProduct"
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `https://ecommercewebsite-2-snc8.onrender.com/product/DeleteProduct/${id}`
        );
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <Container fluid className="product-container mt-4">
      <h2 className="text-center py-4 my-4 section-title">
        <h3>✨ Update/Edit Products Details ✨</h3>

        <div className="search">
          <h5>Search Products By Category : </h5>
          <div className="sea">
            <input type="text"></input>
            <p className="SearchIcon">
              <FaSearch />
            </p>
          </div>
        </div>
      </h2>

      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>
                  <img
                    src={`https://ecommercewebsite-2-snc8.onrender.com/${product.defaultImage}`}
                    alt={product.productName}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.productCategory}</td>
                <td>
                  <FaRupeeSign /> {product.productPrice}
                </td>
                <td>
                  <ul style={{ paddingLeft: "15px" }}>
                    {product.productDescription
                      .split(".")
                      .map((point, i) =>
                        point.trim() ? <li key={i}>{point.trim()}.</li> : null
                      )}
                  </ul>
                </td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(product._id)}
                  >
                    <FaEdit /> Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default EditProduct;
