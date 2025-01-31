import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//icons
import { FaMobileScreen } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { FaGift } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";

function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="header">
        <Container>
          <Navbar.Brand href="#home" className="text-white">
            BEAUTY BONANZA Get Your Amazing Deals
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#app" className="text-white">
                <FaMobileScreen /> Get App |{" "}
              </Nav.Link>
              <Nav.Link href="#store" className="text-white">
                <SlLocationPin />
                Store & Events |{" "}
              </Nav.Link>
              <Nav.Link href="#gift" className="text-white">
                <FaGift /> Gift Card |{" "}
              </Nav.Link>
              <Nav.Link href="#help" className="text-white">
                <IoIosHelpCircleOutline />
                Help{" "}
              </Nav.Link>
              <Nav.Link to="/"></Nav.Link>
              <Nav.Link to="fashion"></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
