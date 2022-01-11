import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    isAdmin: null,
    allUser: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
    logOutUsers: (state) => {
      state.currentUser = null;
      state.isAdmin = null;
    },
    allUsers: (state, action) => {
      state.allUser = action.payload;
    },
    deleteUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});
export const { loginSuccess, logOutUsers, allUsers, deleteUser } =
  adminSlice.actions;

export default adminSlice.reducer;
