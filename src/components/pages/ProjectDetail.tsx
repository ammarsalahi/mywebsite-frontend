import React, { useState,useEffect } from 'react'
import DetailP from '../projects/DetailProject'
import { Api } from '../api/Index'
import { useParams } from 'react-router-dom';
import { PROJECT_DETAIL_ID } from '../api/Endpoints';
import Footer from '../global/Footer'
import { Spin } from 'antd';

export default function ProjectDetail() {
  const {id}=useParams();
  const [projects,setProjects]=useState<any>([]);
  const [others,setOthers]=useState<any>([]);
  const [isLoad,setisLoad]=useState(false)

  const getProject=()=>{
    Api.get(PROJECT_DETAIL_ID(id)).then((res)=>{
        setProjects(res.data.projects)
        setOthers(res.data.others);
        setisLoad(true)
    })
  }
  useEffect(() => {
      getProject()
  }, [])
  return (
    <div>
   {isLoad ? <> <div className='paddingtop'>
        <DetailP project={projects} others={others}/>
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
