"use client";

import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRouter: (router: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const LoginPage: FC<Props> = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();

  const { token } = useSelector((state: any) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        const data = {
          email,
          password,
        };
        await login(data);
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng nhập thành công");
      router.push("/");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, router, error]);

  const { errors, touched, handleBlur, handleChange, handleSubmit, values } =
    formik;

  const handleRegister = () => {
    router.push("/auth/registation");
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, {
      callbackUrl: '/',
      redirect: false
    }).then((result) => {
      if (result?.error) {
        toast.error("Đăng nhập thất bại");
      } else if (result?.ok) {
        toast.success("Đăng nhập thành công");
        router.push('/');
      }
    });
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md bg-white dark:bg-gray-800">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 dark:text-white text-3xl font-extrabold">
                  Đăng nhập
                </h3>
                <p className="text-sm mt-4 text-gray-800 dark:text-gray-300">
                  Bạn không có tài khoản?{" "}
                  <a
                    onClick={handleRegister}
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap cursor-pointer"
                  >
                    Đăng ký tài khoản
                  </a>
                </p>
              </div>

              <div>
                <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                    placeholder="Nhập email"
                  />
                  {/* Email icon */}
                </div>
                {touched.email && errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mt-8">
                <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                  Mật khẩu
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                    placeholder="Nhập mật khẩu"
                  />
                  {/* Password visibility toggle icon */}
                </div>
                {touched.password && errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Ghi nhớ mật khẩu
                  </label>
                </div>
                <div>
                  <a
                    onClick={handleForgotPassword}
                    className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Đăng nhập
                </button>
              </div>

              <div className="space-x-9 flex justify-center mt-8">
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => handleSocialLogin("google")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="border-none outline-none"
                  onClick={() => handleSocialLogin("github")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    fill="#000"
                    viewBox="0 0 22.773 22.773"
                  >
                    <path
                      d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
                {/* <button type="button" className="border-none outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    fill="#007bff"
                    viewBox="0 0 167.657 167.657"
                  >
                    <path
                      d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                      data-original="#010002"
                    ></path>
                  </svg>
                </button> */}
              </div>
            </form>
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;