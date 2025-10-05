import { useEffect, useState } from 'react'
import LastPosts from '../posts/LastPosts'
import LastProjects from '../projects/LastProjects'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { HOME } from '../api/Endpoints'
import { useRecoilState, useRecoilValue } from 'recoil'
import { message } from 'antd'
import { pageLoadSelector, themeSelector } from '../states/Selectors'
import LoadMotion from '../global/LoadMotion'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const [posts,setPosts]=useState<any>([])
  const [projects,setProjects]=useState<any>([]);
  const [loads,setLoads]=useRecoilState(pageLoadSelector)
  const theme=useRecoilValue(themeSelector)
  const {t} = useTranslation()

  const getHome=()=>{
    Api.get(HOME).then((res)=>{
        // setimgs(res.data.userimg)
        setPosts(res.data.posts)
        setProjects(res.data.projects)
        setLoads(true)

    }).catch((_)=>{
      message.error(t("notaccepted"))
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
