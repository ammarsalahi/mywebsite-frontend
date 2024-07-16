import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { AiFillSun, AiOutlineSearch ,AiOutlineFundProjectionScreen, AiOutlineClose, } from 'react-icons/ai'
import users from '../../assets/Remove-bg.ai_1717403474388.png'
import { GrDown } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SiDjango, SiFastapi, SiHtml5, SiPython, SiReact, SiTypescript } from 'react-icons/si'
import { PiNewspaperClipping, PiFireFill } from "react-icons/pi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useRecoilState } from 'recoil'
import { filterAtom, menuAtom, postSearchAtom, projectSearchAtom, projfilterAtom } from '../states/Atoms'
import { AiOutlineMenu } from "react-icons/ai";
import MenuModal from './MenuModal';
import PostFIlter from '../posts/PostFIlter';
import ProjectFilters from '../projects/ProjectFilters';

export default function Navbar() {
  const location=useLocation()
  let navigate=useNavigate()
  const [isSearch,setisSearch]=useState(false)
  const [postSearch,setPostSearch]=useState<any>(postSearchAtom)
  const [projSearch,setProjSearch]=useState<any>(projectSearchAtom)
  const [ismenu,setismenu]=useRecoilState(menuAtom)



  const handlePostSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPostSearch(e.target.value)
  }

  const handleMenu=(e:React.MouseEvent<HTMLElement>)=>{
      setismenu(!ismenu)
  }
  

  return (    
    <nav className={location.pathname=='/'?'nav-blue':'nav-light'}>
      <div className={location.pathname=='/'?'flex justify-between text-white':' flex justify-between text-dark-100'}>
        
        <Link to='/' className='pt-3 lg:pt-5 xl:pt-5 2xl:pt-5 md:pt-4 '>logo</Link>

        <ul className='hidden list-none gap-5 pt-5 lg:flex xl:flex md:flex  2xl:flex  '>
          <li className='text-md hover:border-b-2'>
            <Link to="/posts" className='flex items-center gap-2'>
            <PiNewspaperClipping />
            پست‌ها</Link>
          </li>
          <li className=' text-md hover:border-b-2'>
            <Link to="/projects" className='flex items-center gap-2'>
            <AiOutlineFundProjectionScreen />
            پروژه‌ها</Link>
          </li>
          <li className='text-md hover:border-b-2'>
          <Link to="/about" className='flex items-center gap-2'>
            <BsEmojiSunglasses />
            درباره‌ی من </Link>
          </li>
          {/* <li className='px-5 text-md hover:border-b-2'>
             <Link to="/projects" className='flex items-center gap-2'>
            <PiHandshakeLight />
            درخواست همکاری </Link>
          </li> */}
        </ul>
        <div className="pt-3 lg:hidden md:hidden xl:hidden 2xl:hidden sm:block">
          <Button 
          type='text' 
          icon={ismenu==false?<AiOutlineMenu fontSize={30} color={location.pathname=='/'?'white':'black'}/>:<AiOutlineClose fontSize={30} color={location.pathname=='/'?'white':'black'}/>}
          onClick={handleMenu}
          ></Button>
        </div>
       
       <div className="hidden md:flex lg:flex xl:flex 2xl:flex gap-5 pt-5">
       {location.pathname=='/' && 
       <>
       {isSearch==false?
               <Button  
               icon={<AiOutlineSearch fontSize={20} color={'white'}/>} type='text'
               onClick={()=>setisSearch(true)}
               />
        :
        <Input placeholder='جستجو......' 
        suffix={<AiOutlineClose onClick={()=>setisSearch(false)} className='cursor-pointer' color='red' fontSize={23}/>} 
        prefix={<AiOutlineSearch fontSize={20}  />} />
       }
       </>
       
       }
        <Button  icon={<AiFillSun fontSize={20} color={location.pathname=='/'?'white':'black'}/>} type='text'/>
        </div>
       

      </div>
      {location.pathname=='/'  && ismenu==false &&
      <>
      <div className="grid lg:grid-cols-2 ">
        <div className='flex justify-center'>
          <img src={users} alt="" width={550} />
        </div>
        <div className="text-center text-white lg:pt-40 xl:pt-40 md:pt-20">
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
        
      </div>
      <div className="hidden md:flex lg:flex xl:flex 2xl:flex justify-center pb-3">
        <Button type="text" icon={<GrDown fontSize={30} color='white'/>} />
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
