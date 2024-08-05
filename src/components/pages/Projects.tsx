import React, { useEffect, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import { Api } from '../api/Index'
import { PROJECT_SEARCH_FILTER ,TECHNOLOGIES} from '../api/Endpoints'
import { Spin } from 'antd';
import Footer from '../global/Footer'
import { useRecoilValue } from 'recoil'
import { projectSearchSelector, projfilterSelector } from '../states/Selectors'
import PorjectEmpty from '../global/PorjectEmpty';


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
                <PorjectEmpty/>
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
