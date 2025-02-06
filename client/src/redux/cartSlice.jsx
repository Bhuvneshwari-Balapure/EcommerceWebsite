import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "myCart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, actions) => {
      let Data = state.cart.filter((key) => key.id === actions.payload.id);

      if (Data.length >= 1) {
        alert("Product Already Added!..");
      } else {
        state.cart.push(actions.payload);
      }
    },
    qntyIncrease: (state, actions) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == actions.payload.id) {
          state.cart[i].qnty++;
        }
      }
    },

    qntyDecrease: (state, actions) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == actions.payload.id) {
          if (state.cart[i].qnty <= 1) {
            alert("Quantity not less than 1");
          } else {
            state.cart[i].qnty--;
          }
        }
      }
    },
    itemRemove: (state, actions) => {
      state.cart = state.cart.filter((key) => key.id != actions.payload.id);
    },
  },
});
export const {
  addToCart,
  qntyIncrease,
  qntyDecrease,
  itemRemove,
} = cartSlice.actions;
export default cartSlice.reducer;
