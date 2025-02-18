import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [input, setMyInput] = useState({});
  const navigate = useNavigate();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMyInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const api =
        "https://ecommercewebsite-2-snc8.onrender.com/admin/adminlogin";
      const response = await axios.post(api, input);
      if (response.status === 200) {
        message.success(response.data.msg);
        navigate("/adminLayout");
      }
    } catch (error) {
      message.error(error.response.data.msg);
    }
    console.log(input);
  };

  return (
    <div className="adminLogin">
      <Container className="p-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="login-card p-4 shadow">
              <h2 className="text-center mb-4 text-white">Admin Login</h2>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="email"
                    name="adminId"
                    placeholder="Enter Email"
                    value={input.adminId}
                    onChange={handleInput}
                    className="custom-input"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    name="adminPass"
                    placeholder="Enter Password"
                    value={input.adminPass || ""}
                    onChange={handleInput}
                    className="custom-input"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  className="btn-block custom-btn"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLogin;
