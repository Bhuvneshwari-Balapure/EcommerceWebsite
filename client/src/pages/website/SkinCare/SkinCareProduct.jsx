import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

function SkinCareProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      let api =
        "http://localhost:8080/product/DisplaySpecificProduct?productCategory=SkinCare";
      const response = await axios.get(api);

      if (response.data.Data && response.data.Data.length > 0) {
        setProducts(response.data.Data);
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
    <>
      <div className="display-cards-page">
        <Container fluid className="product-container">
          <h2 className="text-center my-4 section-title">
            ✨ Top Shaadi-Approved Brands ✨
          </h2>
          <Row>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <Col md={3} sm={6} xs={12} key={product._id} className="mb-4">
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
                          src={`http://localhost:8080/${product.defaultImage}`}
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
        </Container>
      </div>
    </>
  );
}

export default SkinCareProduct;
