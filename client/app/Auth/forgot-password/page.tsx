'use client'

import React from 'react'
import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm'
import Header from '@/app/components/Header'
import Heading from '@/app/utils/Heading'
import { useState } from 'react'

const ForgotPasswordPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Heading 
        title="Quên mật khẩu"
        description="Quên mật khẩu" 
        keywords="programming, coding, learning, hub, engineering, university, english, chinese" 
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <div className='mt-6 px-4 sm:px-6 lg:px-8'>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default ForgotPasswordPage