import React from "react";
import Link from "next/link";

export const navItemData = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Khoá học",
    href: "/courses",
  },
  {
    name: "Tài liệu",
    href: "/policy",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemData &&
          navItemData.map((i, index) => (
            <Link href={i.href} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? " dark:text-blue-400 text-red-500"
                    : "dark:text-white text-black"
                }text-[18px] px-6 font-poppins font-[420] capitalize`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-6">
          {navItemData &&
            navItemData.map((i, index) => (
              <Link href={i.href} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? " dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block text-[18px] py-5 px-5 font-poppins font-[400] capitalize`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
