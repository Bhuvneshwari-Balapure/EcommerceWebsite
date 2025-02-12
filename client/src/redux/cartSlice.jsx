import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart2: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart2.find(
        (product) => product.id === action.payload._id
      );
      if (existingProduct) {
        alert("Product already added to cart");
      } else {
        state.cart2.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
