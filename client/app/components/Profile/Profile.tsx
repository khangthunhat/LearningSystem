"use client";

import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Image from "next/image";
import SidebarProfile from "./SidebarProfile";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const { theme } = useTheme();
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);

  const router = useRouter();

  const logoutHandler = async () => {
    console.log("logout");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-full sm:w-[60px] 800px:w-[310px] h-auto sm:h-[450px]  ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-100"
        } bg-opacity-90 border border-[#414c701d] rounded-lg shadow-sm mt-4 sm:mt-[80px] mb-4 sm:mb-[80px] static sm:sticky ${
          scroll ? "sm:top-[120px]" : "sm:top-[30px]"
        } flex flex-col items-start justify-start p-4 sm:p-3 transition-colors duration-200`}
      >
        {/* Nội dung profile */}
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
          theme={theme || "light"}
        />
      </div>
    </div>
  );
};

export default Profile;
