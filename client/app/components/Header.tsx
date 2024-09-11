"use client";

import Link from "next/link";
import React, { FC, useState, useEffect, useCallback } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({ activeItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "screen") {
      setOpenSidebar(false);
    }
  }, []);

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "!bg-white dark:!bg-gray-900 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "!bg-white dark:!bg-gray-900 w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        } text-black dark:text-white`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Popins font-[750] text-black dark:text-white flex items-center`}
              >
                <img src="https://res.cloudinary.com/degqcvmpr/image/upload/v1726045317/logo1_vwf8ju.png" alt="GoDoc Logo" className="w-8 h-8 mr-2" />
                GoDoc
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/*Only for mobile*/}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/*Mobile Sidebar*/}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 bg-opacity-100 dark:bg-opacity-100 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] pl-5 px-2 text-black dark:text-white">
                Copyright © 2024 GoDoc. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
