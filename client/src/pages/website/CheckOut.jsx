// import { useSelector } from "react-redux";
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
import { useLocation } from "react-router-dom";

function CheckOut() {
  const location = useLocation();
  const [mydata, setMydata] = useState({});
  // product image
  const [selectedImage, setSelectedImage] = useState(null);
  const cartData = location.state?.cartData || [];
  // const cartData = useSelector((state) => state.cartPayment.cart2);
  console.log("Cart Data = ", cartData);
  console.log(selectedImage);

  let totalAmount = location.state?.BillAmount || 0;
  let productDetails = "";
  let productName = "";
  let productImage = "";

  cartData.forEach((item) => {
    // totalAmount += item.productPrice * item.quantity;
    productDetails += `${item.productName} qty - ${item.quantity} rate - ${item.productPrice} Image - ${item.productImage}\n`;
    productName = item.productName;
    productImage = item.productImage;

    console.log("Product Detail : ", productDetails);
    console.log("Product Image : ", productImage);
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMydata((values) => ({ ...values, [name]: value }));
    console.log("Updated mydata:", mydata);
  };

  // const [product] = useState({
  //   price: totalAmount,
  //   name: productDetails,
  //   img: "productImg",
  // });

  const handlePay = async () => {
    try {
      setSelectedImage(productImage);
      const orderURL =
        "https://ecommercewebsite-2-snc8.onrender.com/api/payment/orders";
      const { data } = await axios.post(orderURL, {
        amount: totalAmount,
        // amount: product.price,
        productName: productName, // Use the correct product name
        customername: mydata.name,
        address: mydata.address,
        mobile: mydata.mobile,
        email: mydata.email,
        pincode: mydata.pincode,
        id: mydata._id,
      });
      initPay(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const initPay = (data) => {
    const options = {
      key: "rzp_test_0LIaQuP2x7iaTc",
      amount: data.amount,
      currency: data.currency,
      name: mydata.name || "Guest", // Use the correct product name
      description: "Test",
      image: productImage,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL =
            "https://ecommercewebsite-2-snc8.onrender.com/api/payment/verify";
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

  console.log("Total Bill After all Functions : ", totalAmount);

  return (
    <Container
      className="checkoutPage"
      style={{
        marginTop: "12%",
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="text-center">Payment: ₹{totalAmount}</h2>
            </Card.Header>
            <Card.Body>
              <h4>Enter Your Shipping Address</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={mydata.name || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={mydata.address || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={mydata.mobile || ""}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={mydata.pincode || ""}
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
                      <h5>₹{totalAmount.toFixed(2)}</h5>
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
