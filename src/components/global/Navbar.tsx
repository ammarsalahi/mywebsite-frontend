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
import PostFilter from '../posts/PostFilter';
import ProjectFilters from '../projects/ProjectFilters';
import { imgurlSelector } from '../states/Selectors';
import logoblue from '../../assets/logo-blue.png'
import logolight from '../../assets/logo-light.png'
import { themeSelector } from '../states/Selectors';
import iconlight from '../../assets/icon-light.png'
import iconblack from '../../assets/newicon.png'
import NavMenu from './NavMenu'
import NavDropDownMenu from './NavDropDownMenu'

export default function Navbar() {

  const location=useLocation()
  let navigate=useNavigate()
  const [ismenu,setismenu]=useRecoilState(menuAtom)
  const imgurl=useRecoilValue(imgurlSelector)
  const [theme,setTheme]=useRecoilState<any>(themeSelector)


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
      } style={{zIndex:2}}>
      <div className={location.pathname=='/'?'flex justify-between text-white':' flex justify-between text-dark-100'}>
        <div className="logo-menu">
        <Link to='/' className='pt-4 lg:pt-6 xl:pt-6 2xl:pt-6 md:pt-5 '>
         <img src={location.pathname=='/'||theme=="dark"?logolight:logoblue} width={170} />
        </Link>
        </div>
        <div className='list-menus'>
           <NavMenu/>
        </div>
        <div className='logo-mobile'>
        <Link to='/'>
         <button className="btn btn-ghost">
         <img src={location.pathname=='/'||theme=="dark"?iconlight:iconblack} width={30} />
        </button>
        </Link>
        </div>
        <div className="menu-mobile">
          <button 
            className="btn btn-ghost"
            onClick={handleMenu}>
            {ismenu?<AiOutlineClose fontSize={30}/>:<AiOutlineMenu fontSize={30}/>}
          </button>
        </div>
       
       <div className="hidden md:flex lg:flex xl:flex 2xl:flex gap-5 pt-5">
        <div className='drop-menus'>
            <NavDropDownMenu path={location.pathname} theme={theme}/>
        </div>
       {location.pathname=='/' && 
       <>
       <div>

       </div>

     <label className="input input-sm bg-transparent focus:border-white hover:border-white border-white rounded-full input-bordered flex items-center gap-2">
        <AiOutlineSearch fontSize={20} color="white"/>
        <input type="text" className="grow text-white" placeholder="جستجو..." />
      </label>
          
       </>
       
       }
         <button
          className="btn btn-ghost btn-sm"
          onClick={handleTheme}
         >
            {theme=="light"?<AiFillSun fontSize={25}/>: <AiFillMoon fontSize={25}/>}
         </button>
       
        </div>
       

      </div>
      {location.pathname=='/'  && ismenu==false &&
      <div className="py-16 xl:py-28">
      {imgurl!=='' && <div className="grid lg:grid-cols-2 ">
        <div className='flex justify-center'>
          <img src={imgurl} className='rounded-full border-2 border-blue-500 shadow-2xl' alt="" width={400} />
        </div>
        <div className="text-center text-white lg:pt-20 xl:pt-20 md:pt-10 ">
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
      
      </div>
      }

      {location.pathname=='/posts' &&
          <PostFilter/>
      }

      {location.pathname=='/projects' && 
          <ProjectFilters/>
      } 
   
    </nav>
    
  )
}
