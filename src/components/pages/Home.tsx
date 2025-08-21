import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import LastPosts from '../posts/LastPosts'
import LastProjects from '../projects/LastProjects'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { HOME } from '../api/Endpoints'
import { useRecoilState, useRecoilValue } from 'recoil'
import { imgurlAtom } from '../states/Atoms'
import { message, Spin } from 'antd'
import { pageLoadSelector, themeSelector } from '../states/Selectors'
import LoadMotion from '../global/LoadMotion'

export default function Home() {
  const [posts,setPosts]=useState<any>([])
  const [projects,setProjects]=useState<any>([]);
  const [imgs,setimgs]=useRecoilState(imgurlAtom)
  const [loads,setLoads]=useRecoilState(pageLoadSelector)
  const theme=useRecoilValue(themeSelector)

  const getHome=()=>{
    Api.get(HOME).then((res)=>{
        // setimgs(res.data.userimg)
        setPosts(res.data.posts)
        setProjects(res.data.projects)
        setLoads(true)

    }).catch((err)=>{
      message.error("متاسفانه مشکلی پیش آمده است!")
      setLoads(false)
    })
  }
  useEffect(() => {
    getHome()
    // setLoads(true)
  }, [])
  
  return (
    <div>
      {loads ==true ?<div>
      <div>
        <LastPosts posts={posts} theme={theme} reload={getHome}/>
      </div>
      <div>
          <LastProjects projects={projects} theme={theme} reload={getHome}/>
      </div>
      <Footer/>
    </div>
    :
      <LoadMotion/>
    }
    </div>
   
  )
}
