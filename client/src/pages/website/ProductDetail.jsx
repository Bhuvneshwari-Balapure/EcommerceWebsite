import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { message } from "antd"; // Correct import for message

function ProductDetail() {
  const { id } = useParams();
  const [proData, setProData] = useState({});
  const [bigImage, setBigImage] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const loadData = async () => {
    setLoading(true);
    try {
      let api =
        "https://ecommercewebsite-2-snc8.onrender.com/product/ProductDetail";
      const response = await axios.post(api, { id: id });
      setProData(response.data);
      setBigImage(response.data.defaultImage);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to Load Product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const addToCart = async (productId) => {
    if (!userId) {
      message.error("Please Login to Add products in cart");
      return;
    }

    try {
      // Fetch current cart to check if product exists
      let GetApi = `https://ecommercewebsite-2-snc8.onrender.com/Cart/GetCart/${userId}`;
      const response = await axios.get(GetApi);
      const cartItems = response.data?.products || [];
      const productExist = cartItems.some(
        (item) => item.productId === productId
      );

      if (productExist) {
        message.error("Product already exists in the cart.");
        return;
      }
      // Add products to cart
      else {
        let api = "https://ecommercewebsite-2-snc8.onrender.com/Cart/AddToCart";
        const addResponse = await axios.post(api, {
          userId,
          productId,
          productName: proData.productName,
          productPrice: proData.productPrice,
          productImage: bigImage,
        });
        console.log("User Id : ", userId, "Product Id : ", productId);
        console.log("Add To Cart Product:", addResponse.data.cart);
        if (addResponse.status === 200) {
          message.success(addResponse.data.msg);

          // Dispatch custom event to notify cart update
          const cartUpdatedEvent = new Event("cartUpdated");
          window.dispatchEvent(cartUpdatedEvent);
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      message.error(
        error.response?.data?.error || "Failed to add product to cart."
      );
    }
    if (loading) {
      return <Spinner animation="border" />;
    }
  };

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
                  src={`https://ecommercewebsite-2-snc8.onrender.com/${bigImage}`}
                  alt="Product"
                />
                <div className="Detail-thumbnail-container mt-3">
                  {proData?.productImg?.length > 0 ? (
                    proData.productImg.map((item, index) => (
                      <img
                        className="product-detail-thumbnail rounded"
                        key={index}
                        src={`https://ecommercewebsite-2-snc8.onrender.com/${item}`}
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
              <p
                className="product-description"
                style={{ textAlign: "justify" }}
              >
                <ul style={{ paddingLeft: "15px" }}>
                  {proData.productDescription
                    .split(".")
                    .map((point, i) =>
                      point.trim() ? <li key={i}>{point.trim()}.</li> : null
                    )}
                </ul>
              </p>
              <p>
                Available Quantity: <strong>{proData.productQuantity}</strong>
              </p>
              <div className="action-buttons d-flex gap-2 mt-3">
                <Button
                  variant="success"
                  className="px-4 py-2"
                  onClick={() => addToCart(proData._id)}
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
