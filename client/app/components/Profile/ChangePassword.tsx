import React, { useState, FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/default_avatar.png";

type Props = {
  user: any;
  avatar: any;
  theme: string;
};

const ChangePassword: FC<Props> = ({ user, avatar: userAvatar, theme }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10 lg:mt-20 lg:ml-10">
      <div
        className={`
          bg-white dark:bg-gray-900
          h-auto z-50 transition-all duration-300 ease-in-out rounded-lg p-6 shadow-md`}
      >
        {/* Avatar Section */}
        <div className="relative flex justify-center mb-4">
          <Image
            src={userAvatar || avatarDefault}
            alt="avatar"
            width={118}
            height={118}
            className={`rounded-full ${
              theme === "dark"
                ? "border-4 border-indigo-500"
                : "border-4 border-gray-300"
            } shadow-lg`}
          />
        </div>

        {/* Name Section */}
        <div className="text-center mb-4">
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            {name || "User Name"}
          </h2>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Thay đổi mật khẩu
          </p>
        </div>

        {/* Full Name Input */}
        <div className="mt-4">
          <label
            className={`block text-sm font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Mật khẩu cũ
          </label>
          <input
            type="password"
            className={`mt-1 block w-full px-3 py-2 rounded-md ${
              theme === "dark"
                ? "bg-gray-800 text-white border border-gray-600"
                : "bg-gray-100 text-gray-800 border border-gray-300"
            } focus:ring-indigo-500 focus:border-indigo-500`}
          />
        </div>

        {/* Email Input */}
        <div className="mt-4">
          <label
            className={`block text-sm font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Mật khẩu mới
          </label>
          <input
            type="password"
            className={`mt-1 block w-full px-3 py-2 rounded-md ${
              theme === "dark"
                ? "bg-gray-800 text-white border border-gray-600"
                : "bg-gray-100 text-gray-800 border border-gray-300"
            } focus:ring-indigo-500 focus:border-indigo-500`}
          />
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 flex justify-center">
          <button
            className={`px-6 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${
              theme === "dark"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;