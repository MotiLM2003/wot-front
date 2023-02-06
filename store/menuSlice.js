import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuId: 0,
  CRMMenuId: 0,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.menuId = action.payload;
    },
    setCRMId: (state, action) => {
      state.CRMMenuId = action.payload;
    },
  },
});

export const { setId, setCRMId } = menuSlice.actions;

export default menuSlice.reducer;
