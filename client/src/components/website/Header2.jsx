import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
//icon
import { FaShoppingBag } from "react-icons/fa";
// --------------
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "axios";

function Header2() {
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [cartLength, setCartLength] = useState(0);
  // const product = useSelector((state) => state.mycart.cart);
  // const productLength = product.length;

  useEffect(() => {
    // Check localStorage for user info
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserId = localStorage.getItem("userId");

    // If username and email exist in localStorage, set login state to true
    if (storedUserName && storedUserEmail && storedUserId) {
      setUsername(storedUserName);
      setIsLogin(true);

      // edit in code --------------------
      const fetchCartLength = () => {
        axios
          .get(
            `https://ecommercewebsite-2-snc8.onrender.com/Cart/cartLength/${storedUserId}`
          )
          .then((response) => {
            setCartLength(response.data.length);
          })
          .catch((error) => {
            console.error("Error fetching cart length:", error);
          });
      };
      fetchCartLength();
      // Event Listener for cart update
      window.addEventListener("cartUpdated", fetchCartLength);

      // auto

      return () => {
        window.removeEventListener("cartUpdated", fetchCartLength);
      };

      // ----------------------
    } else {
      setIsLogin(false); // If no user found, set login state to false
    }
  }, []);

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Auto logout after 5 mins (300000 ms) of inactivity
        alert("You have been logged out due to inactivity.");
        userLogout(); // Call your logout function
        localStorage.clear(); // Clear localStorage
      }, 300000); // 5 minutes
    };
    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
      "touchmove",
      "touchend",
    ];

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer();

    // Start the timer when component mounts
    return () => {
      clearTimeout(timeout);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  const userLogout = () => {
    // Clear the localStorage when the user logs out
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");

    // Set login state to false
    setIsLogin(false);
    setUsername(""); // Clear username from state

    // Redirect to home page or login page after logout
    navigate("/");
  };
  const displayCart = () => {
    navigate("/AddToCart");
  };

  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary header2">
          <Container>
            <Navbar.Brand href="/" className="webName">
              PINKY
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action1">Categories</Nav.Link>
                <NavDropdown title="Brand" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Brand</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Luxe" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Luxe</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Nayka Fashion" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">
                    Nayka Fashion
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Beauty Advice" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">
                    Beauty Advice
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form
                className="d-flex"
                id="logSign"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                }}
              >
                {isLogin ? (
                  <>
                    {/* Show welcome message and logout button when logged in */}
                    <p>Welcome : {username}</p>
                    <p onClick={userLogout}>Logout</p>
                    <Nav.Link className="bag" onClick={displayCart}>
                      <FaShoppingBag
                        style={{
                          color: "purple",
                          margin: "0px 25px",
                          fontSize: "30px",
                        }}
                      />
                    </Nav.Link>
                    <span
                      style={{
                        width: "35px",
                        height: "35px",
                        padding: "3px",
                        fontSize: "25px",
                        border: "none",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "purple",
                        color: "white",
                      }}
                    >
                      {cartLength}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Show Sign Up and Login links when logged out */}
                    <p>
                      <Nav.Link as={Link} to="/signup" className="login">
                        Sign Up
                      </Nav.Link>
                    </p>
                    <p>
                      <Nav.Link as={Link} to="/login" className="login">
                        Login
                      </Nav.Link>
                    </p>
                  </>
                )}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Header2;
