"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi yêu cầu đặt lại mật khẩu ở đây
    console.log('Gửi yêu cầu đặt lại mật khẩu cho:', email);
    // Sau khi gửi yêu cầu thành công, có thể chuyển hướng hoặc hiển thị thông báo
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-gray-800 dark:text-white text-2xl font-bold">Quên mật khẩu</h3>
              <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">Nhập email của bạn để đặt lại mật khẩu</p>
            </div>

            <div className="mb-6">
              <label className="text-gray-800 dark:text-gray-200 text-sm block mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full px-3 py-2 text-gray-800 dark:text-gray-200 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 bg-transparent" 
                placeholder="Nhập email của bạn" 
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
              Gửi yêu cầu đặt lại mật khẩu
            </button>

            <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
              Nhớ mật khẩu? 
              <a onClick={handleLogin} className="text-blue-600 hover:underline ml-1 cursor-pointer">
                Đăng nhập
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;