"use client"

import React from 'react'
import ResetPasswordForm from '@/app/components/auth/resetPassword.Form'
import Header from '@/app/components/Header'
import Heading from '@/app/utils/Heading'
import { useState } from 'react'

const ResetPasswordPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Heading 
        title="Reset Password"
        description="Reset Password" 
        keywords="programming, coding, learning, hub, engineering, university, english, chinese" 
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <div className='mt-6 px-4 sm:px-6 lg:px-8'>
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPasswordPage