import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let api = "https://ecommercewebsite-2-snc8.onrender.com/users/createUser";
    try {
      const response = await axios.post(api, input);
      console.log(response.data);
      if (response.status === 200) {
        message.success(response.data.msg);
        // Reset the form after successful submission
        setInput({});
        navigate("/login");
      }
    } catch (error) {
      // Check for specific error response and show appropriate message
      if (error.response) {
        message.error(error.response.data.msg || "An error occurred");
      } else {
        message.error("Network error");
      }
      console.log(error);
    }
  };
  const navi = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="Login">
        <div id="login-card">
          <div className="loginSignup" style={{ width: "70%" }}>
            <h2>Create an Account</h2>
            <p>Sign up to get started</p>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input-field"
                  name="userName"
                  value={input.userName || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                  name="userEmail"
                  value={input.userEmail || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter your Mobile Number"
                  className="input-field"
                  name="userMobile"
                  value={input.userMobile || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Create a password"
                  className="input-field"
                  name="userPass"
                  value={input.userPass || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input-field"
                  name="ConfirmPass"
                  value={input.ConfirmPass || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Sign Up
              </button>
            </form>
            <div className="signup-link">
              <p>
                <span className="txt"> Already have an account?</span>
                <a onClick={navi} className="signup-link-text">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
