import React from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { FaHammer, FaHandshake } from 'react-icons/fa'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { langSelector } from '../states/Selectors'
import { useTranslation } from 'react-i18next'

export default function NavMenu() {
  const lang=useRecoilValue(langSelector);
  const {t}=useTranslation()

  const menusFa=[
    {
      url:"/posts",
      icon:<PiNewspaperFill fontSize={22} />
    },
    {
      
      url:"/projects",
      icon:<FaHammer fontSize={22} />
    },
    {
      url:"/about",
      icon:<BsEmojiSunglassesFill fontSize={22} />
    },
    {
      url:"/collaboration",
      icon:<FaHandshake fontSize={22} />
    },
  ]


  return (
      <div>
        <ul className='list-none gap-5 pt-2 flex'>
        {menusFa.map((item:any,idx:number)=>(
            <li className='nav-menu' key={idx}>
              <Link to={item.url} className='flex items-center gap-1'>
                {lang=="fa" && item.icon}
                {t(`menu${idx+1}`)}
                {lang=="en" && item.icon}

              </Link>
            </li>
          ))}
          {/* <li className='nav-menu'>
            <Link to="/posts" className='flex items-center gap-1'>
              <PiNewspaperFill fontSize={20} />
              {lang=="FA"?"پست‌ها":"posts"}
            </Link>
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
          </li>  */}
        </ul> 
      </div>
  )
}
