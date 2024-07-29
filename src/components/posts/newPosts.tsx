import React, { useState ,useEffect} from 'react'
import { PiClock, PiFireFill } from 'react-icons/pi'
import { Api } from '../api/Index'
import { NEW_POSTS } from '../api/Endpoints'
import { Link,useNavigate} from 'react-router-dom'
import { Spin } from 'antd';


export default function NewPosts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [isLoad,setisLoad]=useState(false)
  const getNewPosts=async()=>{
    setisLoad(false)
    await Api.get(NEW_POSTS).then((res)=>{
      setPosts(res.data);
    })
  }
  useEffect(() => {
    getNewPosts()
  
  }, [])
  
  return (
    <div>
   
      {posts.length&&<div className="p-4 mt-10  rounded-lg border-2 border-gray-100">
        <div className="flex items-center gap-3">
            <PiFireFill fontSize={25} className="text-orange-600"/>
            <p className="text-lg">تازه‌ترین پست ها</p>
           
        </div>
        <div className="pt-5">
         {isLoad?
          <>
         {posts?.map((item:any,idx:number)=>(
                <div className={'cursor-pointer p-2 border-t'} key={idx} onClick={()=>navigate(`/posts/${item.post_id}`)}>
                <p className='text-lg'>{item.title}</p>
                <div className='flex text-sm text-gray-600 items-center'>
                  <PiClock fontSize={15}/>
                  <span>{item.persian_date}</span>
                </div>
              </div>
            
            ))}
               </>
        :
            <div className="py-10 grid place-items-center">
               <Spin className="text-red-200"/>
            </div>
        }
            </div>
          </div>}
       
    </div>
  )
}
