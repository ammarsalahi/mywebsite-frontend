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
  const [loads,setLoads]=useState({
    imgs:false,
    posts:false,
    projects:false
  })

  const getHome=(types:string)=>{
    Api.get(HOME).then((res)=>{
      if (types=='imgs'){
        setimgs(res.data.userimg)
        setLoads({...loads,imgs:true})
      }else if(types=='posts'){
        setPosts(res.data.posts)
        setLoads({...loads,posts:true})

      }else{
        setProjects(res.data.projects)
        setLoads({...loads,projects:true})

      }
    }).catch((err)=>{
      message.error("متاسفانه مشکلی پیش آمده است!")
    })
  }
  const onPost=()=>{
    if(loads.posts==false){
      getHome('posts')
    }
  }
  const onProject=()=>{
    if(loads.projects==false){
      getHome('projects')
    }
  }
  useEffect(() => {
    getHome('imgs')
    // window.addEventListener('scroll', () => {
    //   setsocls(window.scrollY);
     
    // });

   
  }, [])
  
  return (
    <div>
      
      {loads.imgs ?
      <>
      <div className="bg-gray-100">
      <div  tabIndex={0} onFocus={onPost} onScroll={onPost} onMouseEnter={onPost}>
        <LastPosts posts={posts} isload={loads.posts}/>
      </div>
      <div  tabIndex={1} onFocus={onProject} onScroll={onProject} onMouseEnter={onProject}>
          <LastProjects projects={projects} isload={loads.projects}/>
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
