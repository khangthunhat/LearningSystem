"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
    console.log('Đăng ký với:', email, password);
    // Sau khi đăng ký thành công, chuyển hướng về trang đăng nhập
    router.push('/Auth/login');
  };

  const handleLogin = () => {
    router.push('/Auth/login');
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md bg-white dark:bg-gray-800">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 dark:text-white text-3xl font-extrabold">Đăng ký</h3>
                <p className="text-sm mt-4 text-gray-800 dark:text-gray-300">Đã có tài khoản? <a onClick={handleLogin}  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Đăng nhập</a></p>
              </div>

              <div className="mb-6">
                <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none" 
                  placeholder="Nhập email" 
                />
                
              </div>

              <div className="mb-6">
                <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">Mật khẩu</label>
                <div className="relative flex items-center">
                  <input 
                    name="password" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
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
                    {/* SVG path cho icon hiển thị/ẩn mật khẩu */}
                  </svg>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-800 dark:text-gray-200 text-xs block mb-2">Xác nhận mật khẩu</label>
                <input 
                  name="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  className="w-full text-gray-800 dark:text-gray-200 text-sm border-b border-gray-300 dark:border-gray-700 focus:border-blue-600 bg-transparent px-2 py-3 outline-none" 
                  placeholder="Xác nhận mật khẩu" 
                />
              </div>

              <div className="mt-12">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
          <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
