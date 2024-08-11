import React, { useEffect, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import { Api } from '../api/Index'
import { PROJECT_TECHNOLOGIES} from '../api/Endpoints'
import { Spin } from 'antd';
import Footer from '../global/Footer'
import PorjectEmpty from '../global/PorjectEmpty';

import { useParams } from 'react-router-dom'

export default function Technologies() {
    const name:any=useParams()
    const [projects,setProjects]=useState<any>([]);
    const [isLoad,setisLoad]=useState(false)
    

    const getProjects=async()=>{
      setisLoad(false)
      await Api.get(PROJECT_TECHNOLOGIES(name)).then((res)=>{
         setProjects(res.data)
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
    <div className='py-14'>
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
