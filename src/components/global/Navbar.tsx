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
import { filterAtom } from '../states/Atoms'

export default function Navbar() {
  const location=useLocation()
  let navigate=useNavigate()
  const [isSearch,setisSearch]=useState(false)


  const [filters,setFilters]=useRecoilState(filterAtom)


  return (
    <nav className={location.pathname=='/'?'pb-4 px-10 bg-blue-500':' sticky top-0 pb-2 px-10 bg-white border-b-2  border-gray-100'}>
      <div className={location.pathname=='/'?'flex justify-between text-white':' flex justify-between text-dark-100'}>
        
        <Link to='/' className='pt-5'>logo</Link>

        <ul className='list-none flex pt-5'>
          <li className='px-5 text-md hover:border-b-2'>
            <Link to="/posts" className='flex items-center gap-2'>
            <PiNewspaperClipping />
            پست‌ها</Link>
          </li>
          <li className='px-5 text-md hover:border-b-2'>
            <Link to="/projects" className='flex items-center gap-2'>
            <AiOutlineFundProjectionScreen />
            پروژه‌ها</Link>
          </li>
          <li className='px-5 text-md hover:border-b-2'>
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
        <div className="flex gap-5 pt-5">
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
        <div className="flex justify-center mb-2 px-20 pt-3 sticky bg-white">
                   <Button 
                      size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                      className={filters.sort=='ascend'?'text-green-600':''} 
                      type='text'
                    >صعودی</Button>
    
                   <Button 
                      size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                      className={filters.sort=='descend'?'text-red-600':''}
                      type='text'>نزولی</Button>
                   <Button 
                      size='large' icon={<AiOutlineAppstore fontSize={20}/>} 
                      className={filters.list=='card'?'text-blue-600':''} 
                      type='text'>جدولی</Button>
                   <Button 
                      size='large' icon={<AiOutlineUnorderedList fontSize={20}/>} 
                      className={filters.list=='list'?'text-purple-600':''} 
                      type='text'>لیستی</Button>
                   <Button 
                      size='large' icon={<PiFireFill fontSize={20}/>} 
                      className={filters.news?'text-orange-600':''} 
                      type='text'>تازه‌ها</Button>
                   <Input allowClear size='large' placeholder="جستجو..." variant='borderless' prefix={<AiOutlineSearch fontSize={20}/>}/> 
                </div> 
      
      
      }

      {/* {location.pathname=='/projects' && 
          <div className="flex justify-start mb-3">
            <Button 
                       size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                       className={filters.ascend==true?'text-green-600':''} 
                       type='text'
                     >صعودی</Button>
     
                    <Button 
                       size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                       className={filters.ascend==false?'text-red-600':''}
                       onClick={handleChange('ascend',filters.ascend)}
                       type='text'>نزولی</Button>
                 
                    <Button 
                       size='large' icon={<PiFireFill fontSize={20}/>} 
                       className={filters.news?'text-orange-600':''} 
                       onClick={handleChange('news',filters.news)}
                       type='text'>تازه‌ها</Button>
                    
                    <Input allowClear size='large' placeholder="جستجو..." variant='borderless' prefix={<AiOutlineSearch fontSize={20}/>}/> 
                 
                 </div>
      } */}
   

   
    </nav>
  )
}
