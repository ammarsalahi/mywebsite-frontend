import React from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs'
import { FaHammer, FaUser } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoSettings } from 'react-icons/io5'
import { PiNewspaperFill } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { langSelector, tokenSelector } from '../states/Selectors'
import { BiCategory } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

interface userProps{
    path:string 
    theme:string
}
export default function UserMenu(props:userProps) {

  const [token,setToken]=useRecoilState(tokenSelector);
  const lang=useRecoilValue(langSelector);
  const { t } = useTranslation();

  let navigate=useNavigate()
  const handleSignout=()=>{
    setToken({
      access:"",
      refresh:"",
      user:""
    })
    navigate("/signin")
  }

    const menusFa=[
      {
        url:"/settings",
        icon:<IoSettings fontSize={22} />
      },
      {
        url:"/posts/add",
        icon:<PiNewspaperFill fontSize={22} />
      },
      {
        url:"/projects/add",
        icon:<FaHammer fontSize={22} />
      },
      {
        url:"/category",
        icon:<BiCategory fontSize={22} />
      },
      // {
      //   url:"/about/add",
      //   icon:<BsEmojiSunglassesFill fontSize={22} />
      // },
      {
        url:"",
        icon:<FiLogOut fontSize={22} />
      },
    ]


  return (
    <div>
    <div className="dropdown dropdown-end dropdown-hover ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
         <FaUser/>
        </div>
        <ul tabIndex={0} className={props.theme=="dark"?"drop-items bg-gray-900 text-white text-start":
            props.path!=="/"?"drop-items bg-white text-black":"drop-items bg-blue-600 text-white"}>
           {menusFa.map((item:any,idx)=>(
              <li key={idx}>
                {item.url!=""?<Link to={item.url} className={lang=='fa'?'flex items-center gap-3':'flex justify-end items-center gap-3'}>
                  {lang=='fa' && item.icon}
                  {t(`user${idx+1}`)} 
                  {lang=='en' && item.icon}
                  </Link>
                  :
                  <button className={lang=='fa'?'flex items-center gap-3':'flex justify-end items-center gap-3'} onClick={handleSignout}>
                  {lang=='fa' && item.icon}
                  {t(`user${idx+1}`)} 
                  {lang=='en' && item.icon}

                  </button>
                  }
               </li>
            ))}
        </ul>
        </div>
    </div>
  )
}
