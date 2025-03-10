import React, { useEffect, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import { Api } from '../api/Index'
import { PROJECT_TECHNOLOGIES} from '../api/Endpoints'
import { Spin } from 'antd';
import Footer from '../global/Footer'

import { useParams } from 'react-router-dom'
import EmptyList from '../global/EmptyList';
import { useRecoilState } from 'recoil';
import { pageLoadSelector } from '../states/Selectors';
import LoadMotion from '../global/LoadMotion';

export default function Technologies() {
    const {name}:any=useParams()
    const [projects,setProjects]=useState<any>([]);
    const [isLoad,setisLoad]=useState(false)
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
    

    const getProjects=async()=>{
      await Api.get(PROJECT_TECHNOLOGIES(name)).then((res)=>{
         setProjects(res.data.results)
      }).finally(()=>{
           setisLoad(true)
        })
    }

    useEffect(() => {
      getProjects()
      setpageLoad(true)
      return () => {
        setProjects([])
      }
    }, [])
   
  return (
    <div>
   {isLoad?<>
    <div className='paddingtop'>
            <div className='flex items-center justify-center md:justify-start'>
                <p className='text-xl'>نتایج برای </p>
                <p className="text-3xl font-bold mx-2">{name}</p>
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
