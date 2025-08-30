import React, { useEffect, useState } from 'react'
import { Button} from 'antd'
import VerticalCard from '../posts/VerticalCard'
import { useParams } from 'react-router-dom'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { POST_KEYWORDS } from '../api/Endpoints'
import { Spin } from 'antd';
import EmptyList from '../global/EmptyList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { pageLoadSelector, themeSelector } from '../states/Selectors'
import LoadMotion from '../global/LoadMotion'
import { Post } from '../types'

export default function Keywords() {
    const [posts,setPosts]=useState<Post[]>([])
    const {name}:any =useParams();
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
    const theme = useRecoilValue(themeSelector)

    
    const [isLoad,setisLoad]=useState(false);
  
    const getFilters=async()=>{
      setisLoad(false)
      await Api.get(POST_KEYWORDS(name)).then((res)=>{
         setPosts(res.data.results)
      }).finally(()=>{
           setisLoad(true)
        })
    }
  
    useEffect(() => {
      getFilters()
      setpageLoad(true)
      return () => {
        setPosts([])
      }
    }, [])
    return (
        <div>
        {isLoad ? <>
         <div className='paddingtop'>
                  <div className='flex justify-start'>
                      <p className='text-xl'>نتایج برای </p>
                      <p className="text-3xl font-bold mx-2">{name}</p>
                  </div> 
               <div>
               {posts.length>0?
              
                <>
                <div className='post-card'>
                  {posts?.map((item:Post,idx:number)=>(
                      <VerticalCard post={item} key={idx} reload={getFilters} theme={theme}/>
                  ))}
                </div>
               
                {posts?.length > 4 &&  <div className="flex justify-center py-10">
                  <Button size='large' type='primary' className=' text-lg rounded-full' iconPosition='end'>بیشتر</Button>
                  </div>}
                
                
                </>
                :
                  <EmptyList name="پستی"/>
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
