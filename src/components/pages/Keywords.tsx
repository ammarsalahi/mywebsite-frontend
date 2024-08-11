import React, { useEffect, useState } from 'react'
import { Button} from 'antd'
import VerticalCard from '../posts/VerticalCard'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { POST_CATEGORY, POST_KEYWORDS } from '../api/Endpoints'
import { useRecoilValue } from 'recoil'
import { filterSelector } from '../states/Selectors'
import { Spin } from 'antd';
import PostEmpty from '../global/PostEmpty'

export default function Keywords() {
    const [posts,setPosts]=useState<any>([])
    const {name}:any =useParams();

    
    const [isLoad,setisLoad]=useState(false);
  
    const getFilters=async()=>{
      setisLoad(false)
      await Api.get(POST_KEYWORDS(name)).then((res)=>{
         setPosts(res.data)
      }).finally(()=>{
           setisLoad(true)
        })
    }
  
    useEffect(() => {
      getFilters()
    
      return () => {
        setPosts([])
      }
    }, [])
    return (
        <div>
        {isLoad ? <>
         <div className='py-14'>   
               {posts.length>0?
              
                <>
                <div className='post-card'>
                  {posts?.map((item:any,idx:number)=>(
                      <VerticalCard post={item} key={idx}/>
                  ))}
                </div>
               
                {posts?.length > 4 &&  <div className="flex justify-center py-10">
                  <Button size='large' type='primary' className=' text-lg rounded-full' iconPosition='end'>بیشتر</Button>
                  </div>}
                
                
                </>
                :
                  <PostEmpty/>
                }
              
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
