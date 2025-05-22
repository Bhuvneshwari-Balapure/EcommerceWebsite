import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function IndexPageCards() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currrentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const navigate = useNavigate();
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
  const ProductDetail = (id) => {
    navigate(`/proDetail/${id}`);
  };

  return (
    <div className="display-cards-page">
      <Container fluid>
        <h2 className="text-center my-4 section-title">
          ✨ Top Shaadi-Approved Brands ✨
        </h2>
        <Row>
          {Array.isArray(products) && products.length > 0 ? (
            currrentProducts.map((product) => (
              <Col
                md={3}
                sm={6}
                xs={12}
                key={product._id}
                className="custom-col mb-4"
              >
                <Card
                  className=" custom-product-card p-3 shadow-lg rounded "
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    ProductDetail(product._id);
                  }}
                >
                  <Card.Body className="text-center">
                    <h4 className="brand-name">{product.productName}</h4>
                    <div className="image-container">
                      <Card.Img
                        variant="top"
                        src={`https://ecommercewebsite-2-snc8.onrender.com/${product.defaultImage}`}
                        className="product-image"
                        alt={product.productName}
                      />
                    </div>
                    <div className="offer-text">
                      {/* <p>{product.productDescription}</p> */}
                      <p style={{ color: "blue", fontSize: "20px" }}>
                        <FaRupeeSign />
                        {product.productPrice}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </Row>
        {products.length > productsPerPage && (
          <div className="text-center my-4">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="mx-3">
              Page {currentPage} of{" "}
              {Math.ceil(products.length / productsPerPage)}
            </span>

            <button
              className="btn btn-outline-primary ms-2"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(products.length / productsPerPage)
                    ? prev + 1
                    : prev
                )
              }
              disabled={
                currentPage === Math.ceil(products.length / productsPerPage)
              }
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default IndexPageCards;
