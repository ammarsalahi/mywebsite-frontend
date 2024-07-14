import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { AiFillSun, AiOutlineSearch ,AiOutlineFundProjectionScreen, AiOutlineClose, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineAppstore, AiOutlineUnorderedList} from 'react-icons/ai'
import users from '../../assets/Remove-bg.ai_1717403474388.png'
import { GrDown } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SiDjango, SiFastapi, SiHtml5, SiPython, SiReact, SiTypescript } from 'react-icons/si'
import { PiNewspaperClipping, PiFireFill } from "react-icons/pi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useRecoilState } from 'recoil'
import { filterAtom, postSearchAtom, projectSearchAtom, projfilterAtom } from '../states/Atoms'
import { AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const location=useLocation()
  let navigate=useNavigate()
  const [isSearch,setisSearch]=useState(false)
  const [postSearch,setPostSearch]=useState<any>(postSearchAtom)
  const [projSearch,setProjSearch]=useState(projectSearchAtom)


  const [filters,setFilters]=useRecoilState(filterAtom)
  const [projfilters,setprojFilters]=useRecoilState(projfilterAtom)


  const handleFilters=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
      setFilters({...filters,[name]:!status})
  }

  const handleProjectFilters=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
    setprojFilters({...projfilters,[name]:!status})
  }

  const handlePostSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPostSearch(e.target.value)
  }
  

  return (
    <nav className={location.pathname=='/'?'pb-4 px-10 bg-blue-500':' sticky top-0 pb-2 px-10 bg-white border-b-2  border-gray-100'}>
      <div className={location.pathname=='/'?'flex justify-between text-white':' flex justify-between text-dark-100'}>
        
        <Link to='/' className='pt-5'>logo</Link>

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
        <div className="pt-5 lg:hidden md:hidden xl:hidden 2xl:hidden sm:block">
          <Button type='text' icon={<AiOutlineMenu fontSize={30} color='white'/>}></Button>
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
      {location.pathname=='/' &&
      <>
      <div className="grid grid-cols-2 ">
        <div className='flex justify-center'>
          <img src={users} alt="" width={550} />
        </div>
        <div className="text-center text-white pt-40">
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
      <div className="flex justify-center pb-3">
        <Button type="text" icon={<GrDown fontSize={30} color='white'/>} />
      </div>
      </>
      }

      {location.pathname=='/posts' &&
        <div className="flex justify-center mb-2 px-20 pt-3 sticky bg-white  ">
                   <Button 
                      size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                      className={filters.assort==true?'text-green-600':''} 
                      onClick={handleFilters('assort',filters.assort)}
                      type='text'>صعودی</Button>
    
                   <Button 
                      size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                      className={filters.assort==false?'text-red-600':''}
                      onClick={handleFilters('assort',filters.assort)}
                      type='text'>نزولی</Button>
                   <Button 
                      size='large' icon={<AiOutlineAppstore fontSize={20}/>} 
                      className={filters.list==false?'text-blue-600':''} 
                      onClick={handleFilters('list',filters.list)}
                      type='text'>جدولی</Button>
                   <Button 
                      size='large' icon={<AiOutlineUnorderedList fontSize={20}/>} 
                      className={filters.list==true?'text-purple-600':''} 
                      onClick={handleFilters('list',filters.list)}
                      type='text'>لیستی</Button>
                   <Button 
                      size='large' icon={<PiFireFill fontSize={20}/>} 
                      className={filters.news?'text-orange-600':''} 
                      onClick={handleFilters('news',filters.news)}
                      type='text'>تازه‌ها</Button>
                   <Input 
                      allowClear size='large' 
                      placeholder="جستجو..." 
                      variant='borderless' 
                      prefix={<AiOutlineSearch fontSize={20}/>}/> 
        </div> 
      }

      {location.pathname=='/projects' && 
          <div className="flex justify-start mb-3">
                    <Button 
                       size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                       className={projfilters.assort==true?'text-green-600':''} 
                       onClick={handleProjectFilters('assort',projfilters.assort)}
                       type='text'
                     >صعودی</Button>
     
                    <Button 
                       size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                       className={projfilters.assort==false?'text-red-600':''}
                       onClick={handleProjectFilters('assort',projfilters.assort)}
                       type='text'>نزولی</Button>
                 
                    <Button 
                       size='large' icon={<PiFireFill fontSize={20}/>} 
                       className={filters.news?'text-orange-600':''} 
                       onClick={handleProjectFilters('news',filters.news)}
                       type='text'>تازه‌ها</Button>
                    
                    <Input allowClear size='large' placeholder="جستجو..." variant='borderless' prefix={<AiOutlineSearch fontSize={20}/>}/> 
                 
          </div>
      } 
   
    </nav>
  )
}
