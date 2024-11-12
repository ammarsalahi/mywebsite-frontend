import React from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { FaHammer, FaUser } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoSettings } from 'react-icons/io5'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { tokenSelector } from '../states/Selectors'
import { BiCategory } from 'react-icons/bi'

interface userProps{
    path:string 
    theme:string
}
export default function UserMenu(props:userProps) {

  const [token,setToken]=useRecoilState(tokenSelector);
  let navigate=useNavigate()
  const handleSignout=()=>{
    setToken({
      access:"",
      refresh:"",
      user:""
    })
    navigate("/signin")
  }
  return (
    <div>
    <div className="dropdown dropdown-end dropdown-hover">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
         <FaUser/>
        </div>
        <ul tabIndex={0} className={props.theme=="dark"?"drop-items bg-gray-900 text-white":
            props.path!=="/"?"drop-items bg-white text-black":"drop-items bg-blue text-white"}>
            <li>
            <Link to="/settings" className='flex items-center gap-3'>
            <IoSettings fontSize={22} />
            تنظیمات</Link>
            </li>
            <li>
            <Link to="/posts/add" className='flex items-center gap-3'>
            <PiNewspaperFill fontSize={22} />
            افزودن پست</Link>
            </li>
            <li>
            <Link to="/projects/add" className='flex items-center gap-3'>
            <FaHammer fontSize={22} />
            افزودن پروژه</Link>
            </li>
            <li>
            <Link to="/category" className='flex items-center gap-3'>
            <BiCategory fontSize={22} />
             دسته‌بندی</Link>
            </li>
            
            <li>
            <Link to="/about/add" className='flex items-center gap-3'>
            <BsEmojiSunglassesFill fontSize={22}  />
            ساخت درباره‌ی من
            </Link>
            </li>
            <li>
            <button className='flex items-center gap-3' onClick={handleSignout}>
              <FiLogOut fontSize={22}  />
                خروج
            </button>
            </li>
          
        </ul>
        </div>
    </div>
  )
}
