import React from 'react'
import {motion} from 'framer-motion'
import logo from '../../assets/icon-light.png'
export default function LoadMotion() {
  return (
    <div className="flex justify-center py-60 bg-blue-600 h-screen">
      <motion.img
        src={logo}
        className="w-20  lg:w-40 "
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          repeat:Infinity,
          repeatType:"reverse"
        }}
      />
  </div>
  )
}
