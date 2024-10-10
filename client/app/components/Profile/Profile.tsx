"use client";

import React, { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SidebarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import MyCourse from "./MyCourse";
import { useRouter } from "next/navigation";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const { theme } = useTheme();
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full lg:w-[85%] flex flex-col lg:flex-row mx-auto">
      {/* Sidebar */}
      <div
        className={`w-full sm:w-[60px] 800px:w-[310px] h-auto sm:h-[450px] ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-100"
        } bg-opacity-90 border border-[#414c701d] rounded-lg shadow-sm mt-4 sm:mt-[80px] mb-4 sm:mb-[80px] lg:sticky ${
          scroll ? "lg:top-[120px]" : "lg:top-[30px]"
        } flex flex-col items-start justify-start p-4 sm:p-3 transition-colors duration-200`}
      >
        {/* Nội dung profile */}
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          theme={theme || "light"}
        />
      </div>

      {/* Profile Info */}
      <div className="w-full lg:w-[90%]  mt-4 lg:mt-0">
        {active === 1 && (
          <ProfileInfo user={user} avatar={avatar} theme={theme || "light"} />
        )}
        {/* Change Password */}
        {active === 2 && (
          <ChangePassword
            user={user}
            avatar={avatar}
            theme={theme || "light"}
          />
        )}
        {/* My Course */}
        {active === 3 && (
           <MyCourse user={user} avatar={avatar} theme={theme || "light"} />
        )}
      </div>
    </div>
  );
};

export default Profile;
