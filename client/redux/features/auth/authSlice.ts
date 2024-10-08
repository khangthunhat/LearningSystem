import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null; // Bạn có thể định nghĩa một interface cụ thể cho user
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: any }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    userForgotPassword: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userResetPassword: (state) => {
      state.token = "";
    },
 
  }
});

export const { userRegistration, userLoggedIn, userLoggedOut, userForgotPassword, userResetPassword } = authSlice.actions;

export default authSlice.reducer;