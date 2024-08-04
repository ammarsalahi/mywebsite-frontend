import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import { Button, Input } from 'antd'
import { AiOutlinePlus, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { PiFireFill } from 'react-icons/pi'
import VerticalCard from '../posts/VerticalCard'
import ProjectCard from '../projects/ProjectCard'
import { useNavigate } from 'react-router-dom'
import { Api } from '../api/Index'
import { PROJECTS ,PROJECT_SEARCH_FILTER ,TECHNOLOGIES} from '../api/Endpoints'
import { Spin } from 'antd';
import Footer from '../global/Footer'
import { useRecoilValue } from 'recoil'
import { projectSearchSelector, projfilterSelector } from '../states/Selectors'


export default function Projects() {
    const [projects,setProjects]=useState<any>([]);
    const [teches,setTeches]=useState<any>([]);
    const [isLoad,setisLoad]=useState(false)
    const projectsearch=useRecoilValue(projectSearchSelector)
    const filters=useRecoilValue(projfilterSelector)

   
    const getFilters=async()=>{
      setisLoad(false)
      await Api.get(PROJECT_SEARCH_FILTER(projectsearch,filters.assort)).then((res)=>{
         setProjects(res.data)
      }).finally(()=>{
           setisLoad(true)
        })
    }
   const getTeches=async()=>{
    await Api.get(TECHNOLOGIES).then((res)=>{
        setTeches(res.data)
    });

   }
    useEffect(() => {
      getFilters()
      getTeches()
      return () => {
        setProjects([])
      }
    }, [projectsearch,filters.assort])
    
  return (
   <div>
   {isLoad?<>
    <div className='paddingtop'>
        <div className='category-show pt-16'>

            {teches.length>0 &&<div className="flex justify-start gap-3 pt-5 ">
              {teches?.map((item:any,idx:number)=>(
                <button  className='py-2 px-10 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white' key={idx} 
              >{item.name}</button>
              ))}
            </div>}
        </div> 
        <div>
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
