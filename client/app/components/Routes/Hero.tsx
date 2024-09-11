import React, { FC } from "react";
import Link from "next/link";

type HeroProps = {};

const Hero: FC<HeroProps> = (props) => {
  return (
    // Thay đổi từ flex flex-col min-h-screen thành flex flex-col
    <div className="flex flex-col">
      <section className="bg-white dark:bg-gray-900">
        {/* Loại bỏ pt-8 lg:pt-12 từ div bên dưới nếu không cần thiết */}
        <div className="flex flex-col-reverse lg:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-7 xl:gap-15 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-5 text-3xl font-bold tracking-tight leading-none md:text-3xl xl:text-3xl text-black  dark:text-white">
              Học hỏi và Chia sẻ Tri thức
            </h1>
            <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-6xl text-black dark:text-white">
              Mọi Nơi, Mọi Lúc
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              <span className="font-bold text-2xl text-black dark:text-white">
                GoDoc
              </span>{" "}
              - Nền tảng học tập và chia sẻ tài liệu hàng đầu, giúp bạn tiếp cận
              kho tàng khóa học và tài liệu phong phú từ mọi lĩnh vực. Học dễ
              dàng, chia sẻ kiến thức không giới hạn, cùng cộng đồng xây dựng
              tương lai tri thức!
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Bắt đầu ngay hôm nay
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Tham gia ngay
            </a>
            <div className="max-w-17 mx-auto mt-6">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600">
                <div className="grid place-items-center h-full w-12 text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 dark:text-gray-200 pr-2 bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  type="text"
                  id="search"
                  placeholder="Tìm kiếm khóa học, tài liệu..."
                />
              </div>
            </div>
          </div>
          <div className="mb-8 lg:mb-0 lg:mt-0 lg:col-span-5 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/degqcvmpr/image/upload/v1726043710/Hero-mock_bddex8.png"
              alt="mockup"
              className="w-3/4 md:w-full max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
