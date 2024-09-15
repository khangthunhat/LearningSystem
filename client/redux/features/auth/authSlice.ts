import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
    userForgotPassword: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userResetPassword: (state) => {
      state.token = "";
    }
  }
});

export const { userRegistration, userLoggedIn, userLoggedOut , userForgotPassword } = authSlice.actions;

export default authSlice.reducer;