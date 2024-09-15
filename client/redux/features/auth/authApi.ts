import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type Registration = {
  name: string;
  email: string;
  password: string;
};

type ForgotPassword = {
    email: string;
};

type ForgotPasswordResponse = {
    message: string;
    reset_token: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoint for user registration
    register: builder.mutation<RegistrationResponse, Registration>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.error("Error during registration:", error);
        }
      },
    }),
    activate: builder.mutation<
      void,
      { activation_token: string; activation_code: string }
    >({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.error("Error during registration:", error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.error("Error during registration:", error);
        }
      },
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPassword>({
      query: (data) => ({
        url: "forget-password",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
        async onQueryStarted(args, { queryFulfilled, dispatch }) {
            try {
            const result = await queryFulfilled;
            console.log("Forgot password response:", result);
            } catch (error: any) {
            console.error("Error during registration:", error);
            }
        },
    }),


    resetPassword: builder.mutation({
      query: ({ reset_token, password }) => ({
        url: "reset-password",
        method: "PUT",
        body: { reset_token, password },
        credentials: "include" as const,
      }),
        async onQueryStarted(args, { queryFulfilled, dispatch }) {
            try {
            const result = await queryFulfilled;
            console.log("Reset password response:", result);
            } catch (error: any) {
            console.error("Error during registration:", error);
            }
        },
    }),
  }),
});

export const { useRegisterMutation, useActivateMutation, useLoginMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
