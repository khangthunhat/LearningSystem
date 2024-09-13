'use client'

import React from 'react'
import LoginForm from '@/app/components/auth/Login.Form'
import Header from '@/app/components/Header'
import Heading from '@/app/utils/Heading'
import { useState } from 'react'

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [currentStep, setCurrentStep] = useState('login');

  const handleSetRouter = (route: string) => {
    setCurrentStep(route);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Heading 
        title="Đăng nhập"
        description="This is a login page for all the students" 
        keywords="programming, coding, learning, hub, engineering, university, english, chinese" 
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <div className='mt-6 px-4 sm:px-6 lg:px-8'>
        <LoginForm setRouter={handleSetRouter} />
      </div>
    </div>
  )
}

export default LoginPage