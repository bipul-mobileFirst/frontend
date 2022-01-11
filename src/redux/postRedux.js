import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
  },

  reducers: {
    allPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { allPost } = postSlice.actions;

export default postSlice.reducer;
