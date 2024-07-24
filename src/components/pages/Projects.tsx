import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import { Button, Input } from 'antd'
import { AiOutlinePlus, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { PiFireFill } from 'react-icons/pi'
import VerticalCard from '../posts/VerticalCard'
import ProjectCard from '../projects/ProjectCard'
import { useNavigate } from 'react-router-dom'
import { Api } from '../api/Index'
import { PROJECTS } from '../api/Endpoints'
import { Spin } from 'antd';
import Footer from '../global/Footer'
export default function Projects() {
   const [projects,setProjects]=useState<any>([]);
   const [isLoad,setisLoad]=useState(false)

   const getProjects=async()=>{
      await Api.get(PROJECTS).then((res)=>{
        setProjects(res.data)
        console.log(res.data)
      }).finally(()=>{
         setisLoad(true)
      })
    }
   
    useEffect(() => {
      getProjects()
      return () => {
        setProjects([])
      }
    }, [])
    
  return (
   <div>
   {isLoad?<>
    <div className='paddingtop'>

        <div className='px-5 lg:px-20 xl:px-20 2xl:px-20 md:px-10 pt-4'>
            {projects.length>0 ? <div className='post-card'>
               {projects?.map((item:any,idx:number)=>(
                   <ProjectCard project={item} key={idx}/>
               ))}
            </div>
            :
            <div className='no-list'>
            <div className=" p-2 lg:p-4 bg-red-300 text-center rounded-lg">
              <p className='text-xl text-red-700'>هیچ پروژه‌ای وجود ندارد!!!</p>
            </div>
          </div>
            }
        </div>
    </div>
    <Footer/>
    </>:
       <div className="h-screen w-screen grid place-items-center">
          <Spin size='large'/>
        </div>
      }
      </div>
  )
}
