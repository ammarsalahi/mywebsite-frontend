import { Button, Input } from 'antd'
import React, { useState,useEffect } from 'react'
import { AiFillSun,AiFillMoon, AiOutlineSearch , AiOutlineClose, } from 'react-icons/ai'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SiDjango, SiFastapi, SiHtml5, SiPython, SiReact, SiTypescript } from 'react-icons/si'
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil'
import { menuAtom, postSearchAtom, projectSearchAtom } from '../states/Atoms'
import { AiOutlineMenu } from "react-icons/ai";
import {FaHammer,FaHandshake} from 'react-icons/fa'
import { PiNewspaperFill } from "react-icons/pi";
import PostFIlter from '../posts/PostFIlter';
import ProjectFilters from '../projects/ProjectFilters';
import { imgurlSelector } from '../states/Selectors';
import logoblue from '../../assets/logo-blue.png'
import logolight from '../../assets/logo-light.png'
import { themeSelector } from '../states/Selectors';


export default function Navbar() {
  const location=useLocation()
  let navigate=useNavigate()
  const [isSearch,setisSearch]=useState(false)
  const [nav,setNav]=useState('nav-blue')
  const [postSearch,setPostSearch]=useState<any>(postSearchAtom)
  const [projSearch,setProjSearch]=useState<any>(projectSearchAtom)
  const [ismenu,setismenu]=useRecoilState(menuAtom)
  const imgurl=useRecoilValue(imgurlSelector)
  const [theme,setTheme]=useRecoilState<any>(themeSelector)

  const handlePostSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPostSearch(e.target.value)
  }

  const handleMenu=(e:React.MouseEvent<HTMLElement>)=>{
      setismenu(!ismenu)
  }
  const handleTheme=()=>{
    if(theme=='light'){
       setTheme('dark')
    }else{
       setTheme('light')
    }
  }
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
  },[theme])
 

  return (    
    <nav className={
        theme=='light'?
        location.pathname=='/'?"nav-blue":'nav-light-fixed'
        :
        location.pathname=='/'?"nav-dark":'nav-dark-fixed'
      } style={{zIndex:1}}>
      <div className={location.pathname=='/'?'flex justify-between text-white':' flex justify-between text-dark-100'}>
        <div className="logo-menu">
        <Link to='/' className='pt-3 lg:pt-5 xl:pt-5 2xl:pt-5 md:pt-4 '>
         <img src={location.pathname=='/'?logolight:logoblue} width={170} />
        </Link>

        <ul className='list-none gap-5 pt-5 flex ms-32'>
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
        </div>
        <div className="pt-3 lg:hidden  xl:hidden 2xl:hidden sm:block md:block">
          <button 
            className="btn btn-ghost"
            onClick={handleMenu}>
            {ismenu?<AiOutlineClose fontSize={30}/>:<AiOutlineMenu fontSize={30}/>}
          </button>
        </div>
       
       <div className="hidden md:flex lg:flex xl:flex 2xl:flex gap-5 pt-5">
       {location.pathname=='/' && 
       <>
         <Input
           variant='borderless'
           prefix={<AiOutlineSearch fontSize={20} color={theme=='dark'?'white':'gray'}/>}
           placeholder='جستجو...'
           
         />
         {/* <label className="input input-sm input-ghost max-w-xs flex items-center gap-5">
          <input type="text" className="grow" placeholder="کلمه کوردنظر را جستجو کنید..." />
          <AiOutlineSearch fontSize={20}/>
        </label> */}
       </>
       
       }
        <Button  
            icon={theme=='light'?
              <AiFillSun fontSize={20} color={location.pathname=='/'?'white':'black'}/>
              :<AiFillMoon fontSize={20} color='white'/>} type='text' onClick={handleTheme}/>
        </div>
       

      </div>
      {location.pathname=='/'  && ismenu==false &&
      <>
      {imgurl!=='' && <div className="grid lg:grid-cols-2 ">
        <div className='flex justify-center'>
          <img src={imgurl} className='rounded-full border-2 border-blue-500 shadow-2xl mt-10' alt="" width={400} />
        </div>
        <div className="text-center text-white lg:pt-40 xl:pt-40 md:pt-20 ">
          <p className='text-6xl'>عمار صلاحی هستم</p>
          <p className='text-6xl mt-10'> توسعه دهنده فول‌استک</p>
          <div className="flex justify-center gap-5 pt-10">
             <SiPython fontSize={30}/>
             <SiDjango fontSize={30} />
             <SiFastapi fontSize={30} />
             <SiReact fontSize={30} />
             <SiTypescript fontSize={30} />
             <SiHtml5 fontSize={30} />


        </div>
        </div>
        
      </div>}
      <div className="hidden md:flex lg:flex xl:flex 2xl:flex justify-center lg:pt-40 md:pt-20 xl:pt-40 2xl:pt-40">
        {/* <Button type="text" icon={<GrDown fontSize={30} color='white'/>} /> */}
      </div>
      </>
      }

      {location.pathname=='/posts' &&
          <PostFIlter/>
      }

      {location.pathname=='/projects' && 
          <ProjectFilters/>
      } 
   
    </nav>
    
  )
}
