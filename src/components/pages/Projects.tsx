import React, { useEffect, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import { Api } from '../api/Index'
import { PROJECT_SEARCH_FILTER ,TECHNOLOGIES} from '../api/Endpoints'
import { Spin } from 'antd';
import Footer from '../global/Footer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { pageLoadSelector, projectSearchSelector, projfilterSelector } from '../states/Selectors'
import PorjectEmpty from '../global/PorjectEmpty';
import EmptyList from '../global/EmptyList';
import LoadMotion from '../global/LoadMotion';


export default function Projects() {
    const [projects,setProjects]=useState<any>([]);
    const [teches,setTeches]=useState<any>([]);
    const [isLoad,setisLoad]=useState(false)
    const projectsearch=useRecoilValue(projectSearchSelector)
    const filters=useRecoilValue(projfilterSelector)
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);

   
    const getFilters=async()=>{
      setisLoad(false)
      await Api.get(PROJECT_SEARCH_FILTER(projectsearch,filters.assort)).then((res)=>{
         setProjects(res.data.results)
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
      setpageLoad(true)
      return () => {
        setProjects([])
      }
    }, [projectsearch,filters.assort])
    
  return (
   <div>
   {isLoad?<>
    <div className='paddingtop'>
        <div className='category-show pt-16 pb-6'>

            {teches.length>0 &&<div className="flex justify-start gap-3 pt-5 ">
              {teches?.map((item:any,idx:number)=>(
                <button  className='mini-item px-7' key={idx} 
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
                <EmptyList name='پروژه‌ای'/>
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
