import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart2: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {},
});

// export const = cartSlice.actions;
export default cartSlice.reducer;
