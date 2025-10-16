import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("renting_userInfo")
    ? JSON.parse(localStorage.getItem("renting_userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      // Store user info in localStorage
      localStorage.setItem("renting_userInfo", JSON.stringify(action.payload));

      // Set expiration time (30 days)
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("renting_expirationTime", expirationTime);
    },
    logOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("renting_userInfo");
      localStorage.removeItem("renting_expirationTime");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
