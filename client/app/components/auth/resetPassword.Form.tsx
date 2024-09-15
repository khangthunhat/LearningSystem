"use client";

import React, { useState, useEffect, FC } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi'; // Adjust the path

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Mật khẩu mới là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const ResetPasswordPage: FC = () => {
  const router = useRouter();
  const { token: reset_token } = useParams();

  const [resetPassword, { isLoading, isSuccess, error , isError }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đặt lại mật khẩu thành công!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } else if (isError && error && 'data' in error) {
      const errorData = (error as any)?.data;
      if (errorData.statusCode === 404) {
        toast.error("Email không tồn tại.");
      } else if (errorData.statusCode === 500) {
        toast.error("Lỗi server. Vui lòng thử lại sau.");
      } else {
        toast.error(errorData?.message || "Có lỗi xảy ra.");
      }
    }
  }, [isSuccess, isError , error, router]); // Chỉ lắng nghe những thay đổi cần thiết

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        console.log("Reset token:", reset_token);
        await resetPassword({ reset_token, password: values.password }).unwrap(); // Gọi unwrap() để xử lý lỗi từ RTK Query
      } catch (err) {
        console.error("Lỗi khi đặt lại mật khẩu:", err);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    },
  });

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-8">
            <h3 className="text-gray-800 dark:text-white text-2xl font-bold">
              Reset Password
            </h3>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-gray-800 dark:text-gray-200 text-sm block mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
            
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="text-gray-800 dark:text-gray-200 text-sm block mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={formik.isSubmitting || isLoading}
          >
            {formik.isSubmitting || isLoading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;