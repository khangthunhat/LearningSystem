'use client'

import { useState } from 'react'
import RegisterForm from '@/app/components/auth/RegisterForm'
import Header from '@/app/components/Header'
import Heading from '@/app/utils/Heading'

const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Heading 
        title="Đăng ký"
        description="This is a registration page for all the students" 
        keywords="programming, coding, learning, hub, engineering, university, english, chinese" 
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <div className='mt-6 px-4 sm:px-6 lg:px-8'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage;