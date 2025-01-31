import { Container, Card } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

const AdminHome = () => (
  <div className="admin-home-page">
    <Container className="d-flex align-items-center justify-content-center min-vh-50">
      <Card className="text-center shadow-lg admin-card">
        <Card.Body>
          <BsPersonCircle className="admin-icon mb-3" size={60} />
          <Card.Title className="admin-welcome-text text-white">
            Welcome, Admin!
          </Card.Title>
          <Card.Text className="cardText">
            Manage Products, View Statistics, and Monitor the System from Here.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  </div>
);

export default AdminHome;
