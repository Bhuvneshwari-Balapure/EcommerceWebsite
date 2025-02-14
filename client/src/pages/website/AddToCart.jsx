import { MdDeleteForever } from "react-icons/md";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
function AddToCart() {
  const [Data, setMyData] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      let api = `http://localhost:8080/Cart/DisplayCartData/${userId}`;
      let response = await axios.get(api);
      console.log("response from in frontend : ", response.data);
      if (response.data.length > 0) {
        setMyData(response.data[0].products);
      }
      console.log("Add to Cart Products:", response.data[0].products);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  // ----------Remove Item ------------------
  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/Cart/DeleteCartItem/${productId}`
      );
      if (response.status === 200) {
        message.success(response.data.msg);
      }
      loadData();
      window.location.reload();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  // -----------------increaseQuantity------------
  const increaseQuantity = async (productId) => {
    try {
      let api = `http://localhost:8080/Cart/IncreaseQuantity/${productId}`;
      const response = await axios.put(api);

      loadData();
      console.log(response.data);
    } catch (error) {
      console.error("Error increasing quantity:", error);
      message.error(error.response.data.msg);
    }
  };
  // -----------------decreaseQuantity------------
  const decreaseQuantity = async (productId) => {
    try {
      let api = `http://localhost:8080/Cart/DecreaseQuantity/${productId}`;
      const response = await axios.put(api);

      loadData();

      console.log(response.data);
    } catch (error) {
      console.error("Error increasing quantity:", error);
      message.error(error.response.data.msg);
    }
  };

  // ---------------------------Navigate to checkout page --------------------------
  const CheckOutPage = () => {
    navigate(`/checkout`, { state: { BillAmount, cartData: Data } });
  };

  // ----------------------Display Products-----------------------

  let sno = 1;
  let totalAmount = 0;
  const BillAmount = Data.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );
  let ans = Data.map((key) => {
    totalAmount = key.productPrice * key.quantity;
    return (
      <>
        <tr style={{ textAlign: "center" }}>
          <td>{sno++}</td>
          <td>
            <img
              src={`http://localhost:8080/${key.productImage}`}
              style={{ height: "60px" }}
              alt={key.productName}
            />
          </td>
          <td>{key.productName}</td>

          <td>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <p style={{ cursor: "pointer" }}>
                <CiCirclePlus
                  size={30}
                  color="purple"
                  onClick={() => increaseQuantity(key.productId)}
                />{" "}
              </p>
              <p style={{ fontSize: "23px" }}> {key.quantity}</p>
              <p style={{ cursor: "pointer" }}>
                <CiCircleMinus
                  size={30}
                  color="purple"
                  onClick={() => decreaseQuantity(key.productId)}
                />
              </p>
            </div>
          </td>
          <td>{key.productPrice}</td>

          <td>{totalAmount}</td>
          <td style={{ cursor: "pointer" }}>
            <MdDeleteForever
              onClick={() => removeItem(key.productId)}
              size={30}
              color="red"
            />
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div style={{ overflowY: "auto", margin: "20px 30px" }}>
        <Table striped bordered hover style={{ padding: "10px" }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Amount</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody>
            {ans}
            {/* Total Bill */}
            <tr
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                background: "linear-gradient(to right, pink, violet)",
                padding: "20px",
              }}
            >
              <td colSpan="5" style={{ textAlign: "center" }}>
                Total Bill
              </td>
              <td>{BillAmount}</td>
              <td style={{ padding: "10px" }}>
                <Button
                  className="custom-button"
                  onClick={() => CheckOutPage({ BillAmount })}
                >
                  Checkout
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AddToCart;
