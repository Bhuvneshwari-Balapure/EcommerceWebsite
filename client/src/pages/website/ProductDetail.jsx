import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
function ProductDetail() {
  const { id } = useParams();
  const [proData, setProData] = useState({});
  const [bigImage, setBigImage] = useState("");
  const dispatch = useDispatch();
  const loadData = async () => {
    try {
      let api = "http://localhost:8080/product/ProductDetail";
      const response = await axios.post(api, { id: id });
      setProData(response.data);
      setBigImage(response.data.defaultImage);
      console.log(response.data);
      console.log("Default Image", response.data.defaultImage);
      console.log("Image", response.data.productImg);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container fluid className="product-detail-container">
        <Row>
          <Col md={5} className="d-flex justify-content-center">
            <Card className="product-detail-card p-3 shadow-lg rounded">
              <div className="mehrab-container">
                <Card.Img
                  className="product-detail-image rounded expandable-image"
                  variant="top"
                  src={`http://localhost:8080/${bigImage}`}
                  alt="Product"
                />

                <div className="Detail-thumbnail-container mt-3">
                  {proData?.productImg?.length > 0 ? (
                    proData.productImg.map((item, index) => (
                      <img
                        className="product-detail-thumbnail rounded"
                        key={index}
                        src={`http://localhost:8080/${item}`}
                        alt="Thumbnail"
                        width="60"
                        height="60"
                        onClick={() => setBigImage(item)}
                      />
                    ))
                  ) : (
                    <p>No additional images available.</p>
                  )}
                </div>
              </div>
            </Card>
          </Col>
          <Col md={7} className="d-flex flex-column justify-content-center">
            <div className="product-details">
              <h2 className="product-title text-primary">
                {proData.productName}
              </h2>
              <h3 className="product-price text-success">
                ${proData.productPrice}
              </h3>
              <p className="text-muted">Category: {proData.productCategory}</p>
              <p className="product-description">
                {proData.productDescription}
              </p>
              <p>
                Available Quantity: <strong>{proData.productQuantity}</strong>
              </p>
              <div className="action-buttons d-flex gap-2 mt-3">
                <Button
                  variant="success"
                  className="px-4 py-2"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: proData._id,
                        name: proData.productName,
                        category: proData.productCategory,
                        price: proData.productPrice,
                        description: proData.productDescription,
                        image: proData.defaultImage,
                        qnty: proData.productQuantity,
                      })
                    );
                  }}
                >
                  🛒 Add to Cart
                </Button>
                <Button variant="primary" className="px-4 py-2">
                  ⚡ Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetail;
