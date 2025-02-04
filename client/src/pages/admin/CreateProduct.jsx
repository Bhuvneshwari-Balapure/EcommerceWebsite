import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
function CreateProduct() {
  const [input, setMyInput] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productQuantity: "",
    productDescription: "",
  });
  const [productImg, setProductImg] = useState([]);
  const handleFileChange = (e) => {
    setProductImg(e.target.files);
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMyInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (
        !input.productName ||
        !input.productCategory ||
        !input.productPrice ||
        !input.productQuantity ||
        !input.productDescription
      ) {
        alert("Please fill all required fields");
        return;
      }

      for (let key in input) {
        formData.append(key, input[key]);
      }

      for (let i = 0; i < productImg.length; i++) {
        formData.append("productImg", productImg[i]);
      }
      console.log("Form data being sent: ", input);

      let api = "http://localhost:8080/product/createProduct";
      const response = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("file uploaded Successfully!...");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-product-page ">
      <Container className="p-5">
        <h3 className="text-center text-white mb-4">Create Product</h3>
        <Form className="shadow-lg p-4 create-product-form">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="productName">
                <Form.Label className="text-white">Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  value={input.productName}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white">Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="productCategory"
                  value={input.productCategory}
                  onChange={handleInput}
                >
                  <option>Open this select menu</option>
                  <option value="Makeup">Makeup</option>
                  <option value="SkinCare">Skin Care</option>
                  <option value="HairCare">Hair Care</option>
                  <option value="BathBody">Bath & Body</option>
                  <option value="Fragrance">Fragrance</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label className="text-white">Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="productPrice"
                  value={input.productPrice}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="stockQuantity">
                <Form.Label className="text-white">Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stock quantity"
                  name="productQuantity"
                  value={input.productQuantity}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label className="text-white">Product Image</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="productDescription">
            <Form.Label className="text-white">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="productDescription"
              value={input.productDescription}
              onChange={handleInput}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="custom-btn"
            id="CreateProductbtn"
            onClick={handleSubmit}
          >
            Create Product
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateProduct;
