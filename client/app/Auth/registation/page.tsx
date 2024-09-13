"use client";

import { useState } from "react";
import RegisterForm from "@/app/components/auth/Register.Form";
import Header from "@/app/components/Header";
import Heading from "@/app/utils/Heading";

const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [currentStep, setCurrentStep] = useState("register");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Heading
        title="Đăng ký"
        description="Trang đăng ký dành cho tất cả sinh viên"
        keywords="lập trình, coding, học tập, hub, kỹ thuật, đại học, tiếng Anh, tiếng Trung"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <RegisterForm setRouter={setCurrentStep} />
      </div>
    </div>
  );
};

export default RegisterPage;
