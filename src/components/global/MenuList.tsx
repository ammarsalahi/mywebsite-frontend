import { Input } from 'antd'
import React from 'react'
import { AiOutlineFundProjectionScreen, AiOutlineSearch } from 'react-icons/ai'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { PiNewspaperClipping } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { menuAtom } from '../states/Atoms'
import {FaHammer,FaHandshake} from 'react-icons/fa'
import { PiNewspaperFill } from "react-icons/pi";
export default function MenuList() {
  const location=useLocation()
  const [ismenu,setismenu]=useRecoilState(menuAtom);

  const handleMenu=(e:React.MouseEvent<HTMLElement>)=>{
      setismenu(false);
  }


  return (
    <div className={location.pathname=='/'?'bg-blue-500 pt-10 px-3':'pt-20 px-3'} style={{height:'100vh'}}>
     {location.pathname=='/' && <Input 
        variant='borderless'
        size='large' className='bg-gray-100 rounded-xl py-3 mb-5'
        placeholder='جستجو...' allowClear
        prefix={<AiOutlineSearch fontSize={20}/>}
      />}
      <ul className='list-none'>
          <li className={location.pathname=='/'?'menu-blue':'menu-light'} onClick={handleMenu}>
            <Link to="/posts" className='flex items-center gap-2' >
            <PiNewspaperFill fontSize={30}/>
            پست‌ها</Link>
          </li>
          <li className={location.pathname=='/'?'menu-blue':'menu-light'}  onClick={handleMenu}>
            <Link to="/projects" className='flex items-center gap-2'>
            <FaHammer fontSize={30}/>
            پروژه‌ها</Link>
          </li>
          <li className={location.pathname=='/'?'menu-blue':'menu-light'}  onClick={handleMenu}>
          <Link to="/about" className='flex items-center gap-2'>
            <BsEmojiSunglassesFill fontSize={30}/>
            درباره‌ی من </Link>
          </li>
           <li className={location.pathname=='/'?'menu-blue':'menu-light'}  onClick={handleMenu}>
          <Link to="/cooperations" className='flex items-center gap-2'>
            <FaHandshake fontSize={30}/>
            درخواست همکاری </Link>
          </li>
         
        </ul>
    </div>
  )
}
