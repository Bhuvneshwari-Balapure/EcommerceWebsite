import { configureStore } from "@reduxjs/toolkit";

//payment
import paymentReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
//install presist from = npm install redux-persist
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, paymentReducer);
const store = configureStore({
  reducer: {
    cartPayment: persistedReducer, // Use persistedReducer here
  },
});

export default store;
export const persistor = persistStore(store);
