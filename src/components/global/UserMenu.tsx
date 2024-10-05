import React from 'react'
import { FaHammer, FaUser } from 'react-icons/fa6'
import { IoSettings } from 'react-icons/io5'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

interface userProps{
    path:string 
    theme:string
}
export default function UserMenu(props:userProps) {
  return (
    <div>
    <div className="dropdown dropdown-end dropdown-hover">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
         <FaUser/>
        </div>
        <ul tabIndex={0} className={props.theme=="dark"?"drop-items bg-gray-800 text-white":
            props.path!=="/"?"drop-items bg-white text-black":"drop-items bg-blue text-white"}>
            <li>
            <Link to="/settings" className='flex items-center gap-2'>
            <IoSettings fontSize={22} />
            تنظیمات</Link>
            </li>
            <li>
            <Link to="/posts/add" className='flex items-center gap-2'>
            <PiNewspaperFill fontSize={22} />
            افزودن پست</Link>
            </li>
            <li>
            <Link to="/projects/add" className='flex items-center gap-2'>
            <FaHammer fontSize={22} />
            افزودن پروژه</Link>
            </li>
            {/* <li>
            <Link to="/about" className='flex items-center gap-2'>
            <BsEmojiSunglassesFill fontSize={22}  />
            درباره‌ی من </Link>
            </li> */}
          
        </ul>
        </div>
    </div>
  )
}
