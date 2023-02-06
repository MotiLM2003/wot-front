import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  user: {},
};

export const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
  },
});

export const { setUser } = useSlice.actions;

export default useSlice.reducer;
