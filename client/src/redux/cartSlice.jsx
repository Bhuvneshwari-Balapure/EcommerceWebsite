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
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
