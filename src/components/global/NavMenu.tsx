import React from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { FaHammer, FaHandshake } from 'react-icons/fa'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export default function NavMenu() {
  return (
        <ul className='list-none gap-5 pt-5 flex'>
          <li className='text-md hover:border-b-2'>
            <Link to="/posts" className='flex items-center gap-2'>
            <PiNewspaperFill fontSize={22} />
            پست‌ها</Link>
          </li>
          <li className='text-md hover:border-b-2'>
            <Link to="/projects" className='flex items-center gap-2'>
            <FaHammer fontSize={22} />
            پروژه‌ها</Link>
          </li>
          <li className='text-md hover:border-b-2'>
          <Link to="/about" className='flex items-center gap-2'>
            <BsEmojiSunglassesFill fontSize={22}  />
            درباره‌ی من </Link>
          </li>
           <li className='text-md hover:border-b-2'>
             <Link to="/cooperations" className='flex items-center gap-2'>
            <FaHandshake fontSize={23}/>
            درخواست همکاری </Link>
          </li> 
        </ul> 
  )
}
