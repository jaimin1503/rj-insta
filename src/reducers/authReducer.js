import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 signup
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getuser } = userSlice.actions;
export default userSlice.reducer;
