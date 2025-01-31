import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function DisplayProduct() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      let api = "http://localhost:8080/product/DisplayProduct";
      const response = await axios.get(api);
      console.log(response.data.products);
      console.log(response.data.products[0].defaultImage);
      // console.log(response.data.products[2].defaultImage);

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

  const proAns = products.map((item) => (
    <>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
        <div className="product-box">
          <i>
            <img
              src={`http://localhost:8080/${item.defaultImage}`}
              style={{ height: "200px" }}
            />
          </i>
          <h3>{item.productName}</h3>
          <span>{item.productPrice}</span>
          <br />
          <Button variant="success">Add to Cart</Button>
        </div>
      </div>
    </>
  ));

  return (
    <>
      <div className="display-cards-page">
        <Container>
          <h2 className="text-center my-4 section-title">
            Our Exclusive Products
          </h2>
          <Row>
            {/* {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <Col md={3} sm={6} xs={12} key={product._id} className="mb-4">
                  <Card className="product-card shadow-lg">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8080/${product.defaultImage}`}
                      className="product-image"
                      alt={product.productName}
                    />
                    <Card.Body>
                      <Card.Title className="product-title">
                        {product.productName}
                      </Card.Title>
                      <Card.Text className="product-description">
                        {product.productDescription}
                      </Card.Text>
                      <h5 className="product-price">{product.productPrice}</h5>
                      <Button variant="dark" className="custom-btn w-100">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No products available.</p>
            )} */}

            <div className="product">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="title">
                      <h2>
                        our <strong className="black">products</strong>
                      </h2>
                      <span>
                        We package the products with best services to make you a
                        happy customer.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-bg">
              <div className="product-bg-white">
                <div className="container">
                  <div className="row">{proAns}</div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DisplayProduct;
