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

export default function Projects() {
   const [projects,setProjects]=useState<any>([]);

   const getProjects=async()=>{
      await Api.get(PROJECTS).then((res)=>{
        setProjects(res.data)
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
        <div className='px-5 lg:px-20 xl:px-20 2xl:px-20 md:px-10 pt-4'>
            {projects.length>0 ? <div className='grid grid-cols-4 gap-5 py-10'>
               {projects?.map((item:any,idx:number)=>{
                   <ProjectCard project={item} key={idx}/>
               })}
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
  )
}
