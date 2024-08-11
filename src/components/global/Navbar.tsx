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
import NavDropDownMenu from './NavDropDownMenu';
import SearchBar from './SearchBar';


export default function Navbar() {

  const location=useLocation()
  let navigate=useNavigate()
  const [ismenu,setismenu]=useRecoilState(menuAtom)
  const imgurl=useRecoilValue(imgurlSelector)
  const [theme,setTheme]=useRecoilState<any>(themeSelector)
  const [search,setSearch]=useState("");


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
    <div className={
        theme=='light'?
        location.pathname=='/'?"nav-blue text-white":'nav-light-fixed'
        :
        location.pathname=='/'?"nav-dark":'nav-dark-fixed'
      }  style={{zIndex:2}}>
      <nav className="navbar items-center pb-3">
        <div className='navbar-start'>

            <div className="logo-menu pt-4">
                  <Link to='/'>
                  <img src={location.pathname=='/'||theme=="dark"?logolight:logoblue} width={170} />
                  </Link>
            </div>
            <div className='logo-mobile'>
                <Link to='/'>
                    <button className="btn btn-ghost">
                    <img src={location.pathname=='/'||theme=="dark"?iconlight:iconblack} width={30} />
                    </button>
                </Link>
            </div>
        </div>
        <div className={theme=="dark"||location.pathname=="/"?"hidden lg:block navbar-center text-white":"hidden lg:block navbar-center text-black"}>
            <div className='list-menus'>
              <NavMenu/>
            </div>
        </div>
        <div className={theme=="dark"||location.pathname=="/"?"navbar-end text-white":"navbar-end text-black"}>
         <div className="menu-mobile">
              <button 
                className="btn btn-ghost"
                onClick={handleMenu}>
                {ismenu?<AiOutlineClose fontSize={30}/>:<AiOutlineMenu fontSize={30}/>}
              </button>
         </div>
      <div className="hidden md:flex gap-1 pt-5">
        <div className='drop-menus'>
            <NavDropDownMenu path={location.pathname} theme={theme}/>
        </div>
       {location.pathname=='/' && 
       <>

     <label className="input input-sm bg-transparent  hover:border-white border-white rounded-full input-bordered flex items-center gap-2">
        <AiOutlineSearch fontSize={20} color="white"/>
        <input 
            type="text" 
            className="grow text-white" 
            placeholder="جستجو..."
            value={search}
            onChange={
              (e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)
            }
       />
      </label>
          
       </>
       
       }
         <button
          className="btn btn-ghost btn-sm"
          onClick={handleTheme}
          >
            {theme=="light"?<AiFillSun fontSize={20}/>: <AiFillMoon fontSize={20} color="white"/>}
         </button>
        </div>
        </div>
      </nav>


      <div>
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
      {location.pathname.startsWith('/search') &&
          <SearchBar/>
      }
      </div>
    </div>
    
  )
}
