import React, { useState } from 'react'
import Navbar from '../global/Navbar'
import LastPosts from '../posts/LastPosts'
import LastProjects from '../projects/LastProjects'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { HOME } from '../api/Endpoints'

export default function Home() {
  const [posts,setPosts]=useState<any>([])
  const [projects,setProjects]=useState<any>([])

  const getHome=()=>{
    Api.get(HOME).then((res)=>{
      setPosts(res.data.posts)
      setProjects(res.data.projects)
    })
  }
  return (
    <div >
      <LastPosts posts={posts}/>
      <LastProjects projects={projects}/>
      <Footer/> 
    </div>
  )
}
