import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import menuReducer from "./menuSlice";
import userReducer from "./userSlice";
import switcherReducer from "./selectedSwitcherSlice";

const reducer = combineReducers({
  menuReducer,
  userReducer,
  switcherReducer,
});

export default configureStore({
  reducer: reducer,
  devTools: true,
});
