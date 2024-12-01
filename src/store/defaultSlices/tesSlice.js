import { createSlice } from "@reduxjs/toolkit";

export const tesSlice = createSlice({
  name: "tes",
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = !!token;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    refreshToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { login, logout, refreshToken } = tesSlice.actions;
export default tesSlice.reducer;