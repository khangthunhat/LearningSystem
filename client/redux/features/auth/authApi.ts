import { socialAuth } from './../../../../server/src/controllers/user.controller';
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
    socialAuth: builder.mutation({
      query: ({email, name, avatar}) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { accessToken, user } = result.data;

          // Lưu token vào localStorage
          localStorage.setItem('accessToken', accessToken);
          
          // Đánh dấu đây là đăng nhập social
          localStorage.setItem('isSocialLogin', 'true');

          // Dispatch action để cập nhật state
          dispatch(
            userLoggedIn({
              accessToken,
              user,
            })
          );

          // Có thể thêm toast thông báo đăng nhập thành công ở đây
          // toast.success("Đăng nhập thành công!");

        } catch (error: any) {
          console.error("Lỗi khi đăng nhập social:", error);
          // Có thể thêm xử lý lỗi cụ thể ở đây, ví dụ:
          // if (error.status === 400) {
          //   toast.error("Email đã được sử dụng.");
          // } else {
          //   toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
          // }
        }
      },
    }),

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
          
          // Clear all login-related data
          localStorage.removeItem('accessToken');
          localStorage.removeItem('isSocialLogin');
          sessionStorage.clear();
          
          // Clear all cookies
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });

          // Clear Redux store
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error("Error during logout:", error);
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
                await queryFulfilled;
                
                // Dispatch action để reset auth state
                dispatch(userLoggedOut());
                
                // Xóa dữ liệu từ localStorage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('isSocialLogin');
                
                // Xóa sessionStorage
                sessionStorage.clear();
                
                // Xóa tất cả cookies
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
            } catch (error: any) {
                console.error("Lỗi khi đăng xuất:", error);
                // Có thể dispatch một action để xử lý lỗi đăng xuất nếu cần
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

export const { useRegisterMutation, useActivateMutation, useLoginMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation, useSocialAuthMutation } = authApi;

// Hàm kiểm tra trạng thái đăng nhập
export const checkAuthStatus = () => async (dispatch: any) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    try {
      const response = await fetch('/api/check-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(userLoggedIn({
          accessToken,
          user: userData
        }));
      } else {
        // Nếu token không hợp lệ, xóa tất cả dữ liệu đăng nhập
        dispatch(userLoggedOut());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isSocialLogin');
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
      dispatch(userLoggedOut());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isSocialLogin');
    }
  } else {
    dispatch(userLoggedOut());
  }
};
