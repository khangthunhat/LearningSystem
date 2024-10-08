"use client";

import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import {
  useSocialAuthMutation,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import avatar from "../../public/assets/default_avatar.png";
import { signOut } from "next-auth/react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ activeItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [loginNotified, setLoginNotified] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogOut, setLogOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data.user?.email,
          name: data.user?.name,
          avatar: data.user?.image,
        });
      }
    }
    if (isSuccess && !loginNotified) {
      toast.success("Đăng nhập thành công!");
      setLoginNotified(true);
    }

    if (data === null) {
      if (isSuccess) {
        toast.success("Đăng xuất thành công!");
      }
    }

    if (data === null) {
      setLogOut(true);
    }
  }, [data, user, socialAuth, isSuccess, loginNotified]);

  // const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target instanceof HTMLElement && e.target.id === "screen") {
  //     setOpenSidebar(false);
  //   }
  // }, []);

  const handleUserIconClick = () => {
    router.push("/auth/login");
  };

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleLogout = async () => {
    try {
      // Đăng xuất khỏi next-auth
      await signOut({ redirect: false });
      
      // Đăng xuất khỏi API tùy chỉnh
      await logout().unwrap();
      
      // Xóa dữ liệu người dùng khỏi localStorage hoặc sessionStorage
      localStorage.removeItem('user');
      
      toast.success("Đăng xuất thành công!");
      // window.location.reload();
      // Chuyển hướng người dùng đến trang chủ hoặc trang đăng nhập
      router.push('/');
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <header className="w-full relative">
      <div
        className={`
          ${active
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed top-0 left-0 w-full shadow-lg"
            : "bg-white dark:bg-gray-900"}
          h-20 z-50 transition-all duration-300 ease-in-out
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
              <img
                src="https://res.cloudinary.com/degqcvmpr/image/upload/v1726045317/logo1_vwf8ju.png"
                alt="GoDoc Logo"
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                GoDoc
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8 text-black">
              <NavItems activeItem={activeItem} isMobile={false} />
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={handleAvatarClick}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <Image
                      src={user.avatar || avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-gray-300 dark:border-gray-700 transition-transform group-hover:scale-110"
                    />
                    <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {user.name}
                    </span>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 transition-all duration-200 ease-in-out">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUserCircle className="mr-2" />
                        Hồ sơ
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaCog className="mr-2" />
                        Cài đặt
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                      >
                        <FaSignOutAlt className="mr-2" />
                        {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleUserIconClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Đăng nhập
                </button>
              )}
              <button
                className="md:hidden focus:outline-none"
                onClick={() => setOpenSidebar(true)}
              >
                <HiOutlineMenuAlt3
                  size={24}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {openSidebar && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setOpenSidebar(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-xl overflow-y-scroll">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Menu
                    </h2>
                    <button
                      onClick={() => setOpenSidebar(false)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-6">
                    <NavItems activeItem={activeItem} isMobile={true} />
                    {user ? (
                      <div className="mt-6 border-t border-gray-200 pt-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Image
                              src={user.avatar ? user.avatar : avatar}
                              alt="user"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                              {user.name}
                            </p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setOpenSidebar(false)}
                          >
                            <FaUserCircle className="mr-4 h-6 w-6 text-gray-400" />
                            Hồ sơ
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setOpenSidebar(false)}
                          >
                            <FaCog className="mr-4 h-6 w-6 text-gray-400" />
                            Cài đặt
                          </Link>
                          <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <FaSignOutAlt className="mr-4 h-6 w-6 text-gray-400" />
                            {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            setOpenSidebar(false);
                            router.push("/auth/login");
                          }}
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Đăng nhập
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 px-4 py-4 flex justify-center border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; 2024 GoDoc. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;