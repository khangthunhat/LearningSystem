"use client";

import Link from "next/link";
import React from "react";
import Header from "./components/Header";
import Heading from "./utils/Heading";

export default function NotFound() {
  return (
    <>
      <Heading
        title="404 - Không tìm thấy trang | GoDoc"
        description="Trang bạn đang tìm kiếm không tồn tại"
        keywords="404, not found, GoDoc"
      />
      <Header open={false} setOpen={() => {}} activeItem={0} />
      <section className="bg-gradient-to-b from-white to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center">
        <div className="container px-6 py-12 mx-auto text-center">
          <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            Oops! Trang không tìm thấy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
              Quay về trang chủ
            </Link>
            <button onClick={() => window.history.back()} className="px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 ease-in-out">
              Quay lại trang trước
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
