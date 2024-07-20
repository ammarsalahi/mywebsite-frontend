import React, { useState } from 'react'
import DetailP from '../projects/DetailProject'
import { Api } from '../api/Index'
import { useParams } from 'react-router-dom';
import { PROJECT_DETAIL_ID } from '../api/Endpoints';
import Footer from '../global/Footer'
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
  return (
    <div>
    <div className='paddingtop'>
       {isLoad && <DetailP projects={projects} others={others}/>}
    </div>
     <Footer/>
    </div>
  )
}
