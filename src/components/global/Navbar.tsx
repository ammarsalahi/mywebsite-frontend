import { Button } from 'antd'
import React from 'react'
import { AiFillSun, AiOutlineArrowDown } from 'react-icons/ai'
import { CiSun } from 'react-icons/ci'
import users from '../../assets/Remove-bg.ai_1717403474388.png'
import { DiPython } from "react-icons/di";
import typeimg from '../../assets/typescript.png'
import djangoimg from '../../assets/django2.png'
import reactimg from '../../assets/react.png'
import pythonimg from '../../assets/python2.png'
import fastimg from '../../assets/fastapi.png'
import { GrDown } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SiCss3, SiDjango, SiFastapi, SiHtml5, SiPython, SiReact, SiReactquery, SiTypescript } from 'react-icons/si'



export default function Navbar() {
  const location=useLocation()
  let navigate=useNavigate()
  return (
    <nav className={location.pathname=='/'?'pb-4 px-10 bg-blue-500':'pb-4 px-10 '}>
      <div className={location.pathname=='/'?'flex justify-between text-white':'flex justify-between text-dark-100'}>
        <Link to='/' className='pt-5'>logo</Link>

        <ul className='list-none flex pt-5'>
          <li className='px-3 text-md'>
            <Link to="/posts">
            
            پست‌ها</Link>
          </li>
          <li className='px-3 text-md'>
            <Link to="/projects">پروژه‌ها</Link>
          </li>
          <li className='px-3 text-md'>
            <a href="/">درباره‌ی من</a>
          </li>
          <li className='px-3 text-md'>
            <a href="/">درخواست همکاری</a>
          </li>
        </ul>
        <div className='flex'>
          <Button className='mt-5' icon={<AiFillSun fontSize={20} color={location.pathname=='/'?'white':'black'}/>} type='text'/>
          <Link 
            className={location.pathname==='/'?'text-white text-lg mt-4 mx-3 px-2':'text-lg mt-4 mx-3 px-2'}
            to="/login"
          >ورود</Link>
        </div>
   

      </div>
      {location.pathname=='/' &&
      <>
      <div className="grid grid-cols-2">
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
            {/* <img src={pythonimg} width={30}/>
            <img src={djangoimg} width={30}/>
            <img src={fastimg} width={30}/>
            <img src={reactimg} width={30}/>
            <img src={typeimg} width={30}/> */}

        </div>
        </div>
        
      </div>
      <div className="flex justify-center pb-3">
        <Button type="text" icon={<GrDown fontSize={30} color='white'/>} />
      </div>
      </>
      }
   

   
    </nav>
  )
}
