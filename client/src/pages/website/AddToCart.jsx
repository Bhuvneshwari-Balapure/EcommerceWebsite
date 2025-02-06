import { Table, Button } from "react-bootstrap";
import { FaShoppingCart, FaMoneyCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { qntyIncrease, qntyDecrease, itemRemove } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function AddToCart() {
  const Data = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  console.log(Data);
  const navigate = useNavigate();

  const mynavigation = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };

  let totalAmount = 0;
  const ans = Data.map((key) => {
    totalAmount += key.price * key.qnty;
    return (
      <>
        <tr>
          <td>
            <img
              src={`http://localhost:8080/${key.productImg}`}
              style={{ height: "60px" }}
            />
          </td>
          <td> {key.name} </td>
          <td> {key.price} </td>
          <td>
            <a
              href="#"
              onClick={() => {
                dispatch(qntyDecrease({ id: key.id }));
              }}
            >
              <FaMinusCircle />
            </a>
            {key.qnty}
            <a
              href="#"
              onClick={() => {
                dispatch(qntyIncrease({ id: key.id }));
              }}
            >
              <FaPlusCircle />
            </a>
          </td>
          <td> {key.qnty * key.price} </td>
          <td>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                dispatch(itemRemove({ id: key.id }));
              }}
            >
              {" "}
              Remove{" "}
            </Button>
          </td>
        </tr>
      </>
    );
  });
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <div>
            <FaShoppingCart /> Your Cart{" "}
          </div>
          <div>
            <FaMoneyCheck /> Total: {totalAmount}
          </div>
          <div>
            <Button variant="primary" onClick={mynavigation}>
              {" "}
              <FaMoneyCheck /> Checkout{" "}
            </Button>
          </div>
        </div>

        <div style={{ height: "50vh", overflowY: "scroll" }}>
          <Table striped bordered hover>
            <thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                zIndex: 1,
              }}
            >
              <tr>
                <th>#</th>
                <th>Product</th>
                <th> Price </th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {ans}

              <th>Total Price</th>
              <th></th>
              <th> </th>
              <th></th>
              <th> {totalAmount} </th>
              <th> </th>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default AddToCart;
