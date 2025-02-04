import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
function Login() {
  const [input, setMyInput] = useState({});
  const navigate = useNavigate();
  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setMyInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let api = "http://localhost:8080/users/LoginUser";
      const response = await axios.post(api, {
        userEmail: input.userEmail,
        userPass: input.userPass,
      });
      if (response.status === 200) {
        message.success(response.data.msg);
        console.log(response.data.User.userName);
        localStorage.setItem("userName", response.data.User.userName);
        localStorage.setItem("userEmail", response.data.User.userEmail);
        localStorage.setItem("userId", response.data.User._id);
        navigate("/");
        // this will reload the page
        window.location.reload();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.msg);
    }
  };
  return (
    <>
      <div id="Login">
        <div id="login-card">
          <div style={{ width: "70%" }}>
            <h2>Welcome Back!</h2>
            <p>Please log in to continue</p>
            <form>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="userEmail"
                  value={input.userEmail || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="userPass"
                  value={input.userPass || ""}
                  onChange={handleInput}
                  required
                />
              </div>
              <button
                type="button"
                className="login-btn"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </form>
            <div className="signup-link">
              <p>
                <span className="txt">Do not have an account?</span>

                <a href="/signup" className="signup-link-text">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
