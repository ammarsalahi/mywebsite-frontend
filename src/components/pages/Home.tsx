import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import LastPosts from '../posts/LastPosts'
import LastProjects from '../projects/LastProjects'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { HOME } from '../api/Endpoints'
import { useRecoilState } from 'recoil'
import { imgurlAtom } from '../states/Atoms'
import { message } from 'antd'

export default function Home() {
  const [posts,setPosts]=useState<any>([])
  const [projects,setProjects]=useState<any>([]);
  const [imgs,setimgs]=useRecoilState(imgurlAtom)

  const getHome=()=>{
    Api.get(HOME).then((res)=>{
      setPosts(res.data.posts)
      setProjects(res.data.projects)
      setimgs(res.data.userimg)
    }).catch((err)=>{
      message.error("متاسفانه مشکلی پیش آمده است!")
    })
  }
  useEffect(() => {
    getHome()
   
  }, [])
  
  return (
    <div >
      <LastPosts posts={posts}/>
      <LastProjects projects={projects}/>
      <Footer/> 
    </div>
  )
}
