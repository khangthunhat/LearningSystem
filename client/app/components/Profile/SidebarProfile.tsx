import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/default_avatar.png";
import { RiLockPasswordLine, RiBookletLine, RiFileList3Line, RiLogoutBoxLine } from "react-icons/ri";
type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: any;
  theme: string;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  avatar,
  theme,
}) => {
  return (
    <div className="w-full space-y-2">
      <div
        className={`flex items-center p-3 rounded-lg transition-all duration-200
          ${active === 1
            ? theme === 'dark' ? "bg-slate-800 shadow-md" : "bg-slate-200 shadow-md"
            : theme === 'dark' ? "bg-slate-900 hover:bg-slate-800" : "bg-white hover:bg-slate-100"
          }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar || avatarDefault}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
        <h5 className={`ml-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>
          {user.name}
        </h5>
      </div>

      {[
        { icon: RiLockPasswordLine, text: "Đổi mật khẩu", action: () => setActive(2) },
        { icon: RiBookletLine, text: "Khoá học của tôi", action: () => setActive(3) },
        { icon: RiFileList3Line, text: "Tài liệu đã lưu", action: () => setActive(4) },
        // { icon: RiLogoutBoxLine, text: "Đăng xuất", action: logoutHandler }
      ].map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200
            ${active === index + 2
              ? theme === 'dark' ? "bg-slate-800 shadow-md" : "bg-slate-200 shadow-md"
              : theme === 'dark' ? "bg-slate-900 hover:bg-slate-800" : "bg-white hover:bg-slate-100"
            }`}
          onClick={item.action}
        >
          <item.icon size={24} className={theme === 'dark' ? 'text-white' : 'text-gray-700'} />
          <span className={`ml-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>
            {item.text}
          </span>
        </div>
      ))}

      
    </div>
  );
};

export default SidebarProfile;
