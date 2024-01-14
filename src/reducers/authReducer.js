import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 signupdata:null,
 loading:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setsignupdata: (state, action) => {
      state.signupdata = action.payload;
    },
  },
});

export const { setsignupdata } = authSlice.actions;
export default authSlice.reducer;
