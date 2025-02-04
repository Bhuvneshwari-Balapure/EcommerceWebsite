import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top-footer">
        <Container>
          <Row className="justify-content-between">
            <Col md={4}>
              <h5>Get special discount on your inbox</h5>
              <div className="email-subscribe">
                <input type="email" placeholder="Your Email" />
                <button>SEND</button>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <h5>Experience the Nykaa Mobile App</h5>
              <div className="app-links">
                <img src="google-play.png" alt="Google Play" />
                <img src="app-store.png" alt="App Store" />
              </div>
            </Col>
            <Col md={4} className="text-right">
              <h5>For Any Help, Call Us</h5>
              <p>1800-267-4444</p>
              <p>Monday to Saturday, 8AM to 10PM</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="middle-footer">
        <Container>
          <Row>
            <Col md={3}>
              <h6>Who We Are?</h6>
              <ul>
                <li>Careers</li>
                <li>Press</li>
                <li>Testimonials</li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Help</h6>
              <ul>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Shipping & Returns</li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Quick Links</h6>
              <ul>
                <li>Offer Zone</li>
                <li>New Launches</li>
                <li>Nykaa Pro</li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Top Categories</h6>
              <ul>
                <li>Makeup</li>
                <li>Skin</li>
                <li>Hair</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="bottom-footer">
        <Container>
          <Row className="justify-content-between">
            <Col md={4}>
              <p>© 2025 NYKAA E-RETAIL LIMITED All Rights Reserved.</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="social-icons">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-youtube"></i>
              </div>
            </Col>
            <Col md={4} className="text-right">
              <ul className="policy-links">
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Shipping Policy</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
