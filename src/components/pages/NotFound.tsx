import React from 'react'
import Navbar from '../global/Navbar'

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <Navbar/>
        <div className='flex flex-col justify-center items-center'>
            <p className='text-[95px] md:text-[180px] font-semibold text-primary'>۴۰۴</p>
        </div>
        <p className='text-xl '>این صفحه رو نداریم فعلا !!!</p>
    </div>
  )
}
