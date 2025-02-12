import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";

function CheckOut() {
  const [input, setInput] = useState({});
  const cartData = useSelector((state) => state.cartPayment.cart2);
  console.log("Cart Data = ", cartData);
  let totalAmount = 0;
  let productDetails = "";

  cartData.forEach((item) => {
    totalAmount += item.productPrice * item.quantity;
    productDetails += `${item.productName} qty - ${item.quantity} rate - ${item.productPrice}\n`;
    console.log("Product Detail : ", productDetails);
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const [product] = useState({
    price: totalAmount,
    name: productDetails,
    img: "t1.jpg",
  });

  const initPay = (data) => {
    const options = {
      key: "rzp_test_mg58Tt5C5e05nE",
      amount: data.amount,
      currency: data.currency,
      name: product.productName,
      description: "my good t-shirt",
      image: product.productImage,
      order_id: data.productId,
      handler: async (response) => {
        try {
          const verifyURL = "https://localhost:8000/api/payment/verify";
          await axios.post(verifyURL, response);
        } catch (error) {
          console.error(error);
        }
      },
      theme: { color: "#3399cc" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8000/api/payment/orders";
      const { data } = await axios.post(orderURL, {
        amount: product.productPrice,
        productitems: product.productName,
        ...input,
      });
      initPay(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="text-center">Payment</h2>
            </Card.Header>
            <Card.Body>
              <h4>Enter Your Shipping Address</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={input.name || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={input.address || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={input.mobile || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={input.pincode || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>
                      <h5>Net Payable Amount:</h5>
                    </td>
                    <td>
                      <h5>{totalAmount}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-center">
                      <Button variant="success" onClick={handlePay}>
                        Pay Now!
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckOut;
