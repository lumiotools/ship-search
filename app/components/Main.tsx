"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import main from "../../public/main.png"

const Main = () => {
  return (
    <div className='w-full bg-navbar-bg flex items-center justify-center h-screen'>
      <motion.div
        initial={{ scale: 0, rotate: 0 }} 
        animate={{ scale: 1, rotate: 360 }} 
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image src={main} alt='' className=''/>
      </motion.div>
    </div>
  )
}

export default Main