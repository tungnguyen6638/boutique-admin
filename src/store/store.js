import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./authenticateSlice";

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
  },
});

export default store;
