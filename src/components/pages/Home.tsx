import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import LastPosts from '../posts/LastPosts'
import LastProjects from '../projects/LastProjects'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { HOME } from '../api/Endpoints'
import { useRecoilState } from 'recoil'
import { imgurlAtom } from '../states/Atoms'
import { message, Spin } from 'antd'

export default function Home() {
  const [posts,setPosts]=useState<any>([])
  const [projects,setProjects]=useState<any>([]);
  const [imgs,setimgs]=useRecoilState(imgurlAtom)
  const [socls,setsocls]=useState(0)
  const [loads,setLoads]=useState(false)

  const getHome=()=>{
    Api.get(HOME).then((res)=>{
        setimgs(res.data.userimg)
        setPosts(res.data.posts)
        setProjects(res.data.projects)
        setLoads(true)

    }).catch((err)=>{
      message.error("متاسفانه مشکلی پیش آمده است!")
    })
  }
  useEffect(() => {
    getHome()
  }, [])
  
  return (
    <div>
      
      {loads?
      <>
      <div >
      <div>
        <LastPosts posts={posts}/>
      </div>
      <div>
          <LastProjects projects={projects}/>
      </div>
      <Footer/>
    </div>
    </>:
        <div className="h-screen w-screen grid place-items-center">
        <Spin size='large' />
      </div>}

    </div>
   
  )
}
