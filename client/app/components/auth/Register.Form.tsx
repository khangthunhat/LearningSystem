"use client";

import React, { useState, FC, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import {
  useRegisterMutation,
  useActivateMutation,
} from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  setRouter: (router: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Tên người dùng là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .oneOf([Yup.ref("password")], "Mật khẩu phải khớp"),
});

const RegisterPage: FC<Props> = ({ setRouter }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const [register, { isSuccess, error, data }] = useRegisterMutation();

  const { token } = useSelector((state: any) => state.auth);

  const [
    activation,
    { isSuccess: isActivationSuccess, error: activationError },
  ] = useActivateMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data.message || "Đăng ký thành công";
      toast.success(message);
      setIsVerifying(true);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (isActivationSuccess) {
      toast.success("Đăng ký thành công");
      router.push("/Auth/login");
    }
    if (activationError) {
      if ("data" in activationError) {
        const errorData = activationError as any;
        toast.error(errorData.data.message);
      } else {
        toast.error("Đã có lỗi xảy ra");
      }
    }
  }, [isActivationSuccess, activationError, router]);

  const verificationCodeHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const verificationNumber = Object.values(verificationCode).join("");
    if (verificationNumber.length !== 4) {
      toast.error("Mã xác nhận phải có 4 số");
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, confirmPassword }) => {
      try {
        const data = {
          name,
          email,
          password,
          confirmPassword,
        };
        await register(data);
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
      }
    },
  });

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <div className="grid md:grid-cols-2 items-center justify-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md bg-white dark:bg-gray-800">
          <div className="md:max-w-md w-full px-4 py-4 justify-center">
            {!isVerifying ? (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-gray-800 dark:text-white text-3xl font-extrabold">
                    Đăng ký
                  </h3>
                  <p className="text-sm mt-4 text-gray-800 dark:text-gray-300">
                    Đã có tài khoản?{" "}
                    <a
                      onClick={handleLogin}
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Đăng nhập
                    </a>
                  </p>
                </div>

                <div className="mb-6">
                  <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                    Tên người dùng
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                      placeholder="Nhập tên người dùng"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                      placeholder="Nhập email"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path
                            d="M0 512h512V0H0Z"
                            data-original="#000000"
                          ></path>
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        ></path>
                        <path
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="40"
                          d="M472 274.9V107.999c0-11.046-8.954-20-20-20H60c-11.046 0-20 8.954-20 20V274.9"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                      placeholder="Nhập mật khẩu"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      viewBox="0 0 128 128"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.854 0 50.535-24.795 55.293-32.006C114.535 56.795 95.854 32 64 32 32.146 32 13.465 56.795 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                      placeholder="Xác nhận mật khẩu"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      viewBox="0 0 128 128"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.854 0 50.535-24.795 55.293-32.006C114.535 56.795 95.854 32 64 32 32.146 32 13.465 56.795 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    {formik.isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={verificationCodeHandler}>
                <div className="mb-12">
                  <h3 className="text-gray-800 dark:text-white text-3xl font-extrabold">
                    Xác minh email
                  </h3>
                  <p className="text-sm mt-4 text-gray-800 dark:text-gray-300">
                    Nhập mã 4 số đã được gửi đến email của bạn
                  </p>
                </div>
                <div className="mb-6">
                  <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">
                    Mã xác nhận
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={4}
                    required
                    className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none"
                    placeholder="Nhập mã 4 số"
                  />
                </div>
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    {formik.isSubmitting ? "Đang xác nhận..." : "Xác nhận"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://res.cloudinary.com/degqcvmpr/image/upload/v1726219913/xtsr6hzw6gqekgw4egmc.webp"
              className="w-full h-full object-contain "
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
