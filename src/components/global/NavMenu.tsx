import React from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { FaHammer, FaHandshake } from 'react-icons/fa'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export default function NavMenu() {
  return (
      <div>
        <ul className='list-none gap-5 pt-2 flex'>
          <li className='nav-menu'>
            <Link to="/posts" className='flex items-center gap-2'>
            <PiNewspaperFill fontSize={20} />
            پست‌ها</Link>
          </li>
          <li className='nav-menu'>
            <Link to="/projects" className='flex items-center gap-2'>
            <FaHammer fontSize={20} />
            پروژه‌ها</Link>
          </li>
          <li className='nav-menu'>
          <Link to="/about" className='flex items-center gap-2'>
            <BsEmojiSunglassesFill fontSize={20}  />
            درباره‌ی من </Link>
          </li>
           <li className='nav-menu'>
             <Link to="/cooperations" className='flex items-center gap-2'>
            <FaHandshake fontSize={20}/>
            درخواست همکاری </Link>
          </li> 
        </ul> 
      </div>
  )
}
