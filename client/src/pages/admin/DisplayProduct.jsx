import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

function DisplayProduct() {
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate();

  const loadData = async () => {
    try {
      let api =
        "https://ecommercewebsite-2-snc8.onrender.com/product/DisplayProduct";
      const response = await axios.get(api);

      if (response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container fluid className="product-container mt-4">
      <h2 className="text-center my-4 section-title">✨ Products ✨</h2>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={product._id}
                style={{
                  height: "150px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
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
                <td style={{ textAlign: "justify" }}>
                  <ul style={{ paddingLeft: "15px" }}>
                    {product.productDescription
                      .split(".")
                      .map((point, i) =>
                        point.trim() ? <li key={i}>{point.trim()}.</li> : null
                      )}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default DisplayProduct;
