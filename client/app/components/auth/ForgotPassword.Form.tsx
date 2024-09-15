"use client";

import React, { useState, FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";

type Props = {
  setRouter: (router: string) => void;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
});

const ForgotPasswordPage: FC<Props> = ({ setRouter }) => {
  const router = useRouter();
  const [
    forgotPassword,
    { data, isSuccess, error, isError, isLoading },
  ] = useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Yêu cầu đặt lại mật khẩu đã được gửi, vui lòng kiểm tra email của bạn.';
      toast.success(message);
      setTimeout(() => {
        router.push('/auth/login');
      }, 1000);
    }

    if (isError && error && 'data' in error) {
      const errorData = (error as any)?.data;
      if (errorData.statusCode === 404) {
        toast.error("Email không tồn tại.");
      } else if (errorData.statusCode === 500) {
        toast.error("Lỗi server. Vui lòng thử lại sau.");
      } else {
        toast.error(errorData?.message || "Có lỗi xảy ra.");
      }
    }
  }, [data, router, isSuccess, error, isError]);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await forgotPassword({ email: values.email });
      } catch (error) {
        console.error("Error submitting forgot password:", error);
      }
    },
  });

  return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 dark:text-white text-2xl font-bold">
                  Quên mật khẩu
                </h3>
                <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
                  Nhập email của bạn để đặt lại mật khẩu
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="text-gray-800 dark:text-gray-200 text-sm block mb-2">
                  Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-gray-800 dark:text-gray-200 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 bg-transparent"
                    placeholder="Nhập email của bạn"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.email}
                    </div>
                )}
              </div>

              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  disabled={formik.isSubmitting || isLoading} // Disable button while loading
              >
                {isLoading ? "Đang gửi..." : "Gửi yêu cầu đặt lại mật khẩu"}
              </button>

              <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
                Nhớ mật khẩu?
                <a onClick={() => setRouter('login')} className="text-blue-600 hover:underline ml-1 cursor-pointer">
                  Đăng nhập
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ForgotPasswordPage;