export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    // booking_start : 
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
    },
  },
});

export const { login, logout, refreshToken } = tesSlice.actions;
export default tesSlice.reducer;
