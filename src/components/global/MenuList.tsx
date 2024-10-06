import { Input } from 'antd'
import React from 'react'
import { AiOutlineFundProjectionScreen, AiOutlineSearch,AiFillSun,AiFillMoon } from 'react-icons/ai'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { PiNewspaperClipping } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { menuAtom } from '../states/Atoms'
import {FaHammer,FaHandshake} from 'react-icons/fa'
import { PiNewspaperFill } from "react-icons/pi";
import { themeSelector } from '../states/Selectors';

export default function MenuList() {
  const location=useLocation()
  const [ismenu,setismenu]=useRecoilState(menuAtom);
  const [theme,setTheme]=useRecoilState<any>(themeSelector)


  const handleMenu=(e:React.MouseEvent<HTMLElement>)=>{
      setismenu(false);
  }
  const handleTheme=()=>{
    if(theme=='light'){
       setTheme('dark')
    }else{
       setTheme('light')
    }
  }


  return (
    <div className={
        theme=="light"?
        location.pathname=='/'? 'bg-blue-600 px-3 h-full':'pt-20 px-3 h-full'
        :
        location.pathname=="/"?'bg-gray-800 px-3 h-full':'bg-gray-800 pt-20 px-3 h-full'}>
        <div className="py-5 flex justify-center">
            <button
          className="btn btn-ghost"
          onClick={handleTheme}
         >
            {theme=="light"?<AiFillSun fontSize={35}/>: <AiFillMoon fontSize={35}/>}
         </button>
        </div>
     {location.pathname=='/' && 

     <label className="input bg-transparent focus:border-white hover:border-white border-white rounded-full input-bordered flex items-center gap-2 mb-3">
        <AiOutlineSearch fontSize={20} color="white"/>
        <input type="text" className="grow text-white" placeholder="جستجو..." />
      </label>
      }
      <ul className={theme=='dark'||location.pathname=="/"?'list-none text-white':'list-none'}>
          <li className="px-4 py-5 text-lg" onClick={handleMenu}>
            <Link to="/posts" className='flex items-center gap-2' >
            <PiNewspaperFill fontSize={30}/>
            پست‌ها</Link>
          </li>
          <li className="px-4 py-5 text-xl"  onClick={handleMenu}>
            <Link to="/projects" className='flex items-center gap-2'>
            <FaHammer fontSize={30}/>
            پروژه‌ها</Link>
          </li>
          <li className="px-4 py-5 text-xl" onClick={handleMenu}>
          <Link to="/about" className='flex items-center gap-2'>
            <BsEmojiSunglassesFill fontSize={30}/>
            درباره‌ی من </Link>
          </li>
           <li className="px-4 py-5 text-xl"  onClick={handleMenu}>
          <Link to="/cooperations" className='flex items-center gap-2'>
            <FaHandshake fontSize={30}/>
            درخواست همکاری </Link>
          </li>
         
        </ul>
    </div>
  )
}
