import React, { useState ,useEffect} from 'react'
import { PiClock, PiFireFill } from 'react-icons/pi'
import { Api, showImage } from '../api/Index'
import { NEW_POSTS } from '../api/Endpoints'
import { useNavigate} from 'react-router-dom'
import { Spin } from 'antd';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface postProps{
  theme:string
}

export default function NewPosts(props:postProps) {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [isLoad,setisLoad]=useState(false)
  const getNewPosts=async()=>{
    await Api.get(NEW_POSTS).then((res)=>{
      setPosts(res.data);
      setisLoad(true)
    })
  }
  useEffect(() => {
    getNewPosts()
  
  }, [])
  
  return (
    <div>
   
      {posts.length&&<div className={`card-${props.theme} fresh`}>
        <div className="flex items-center justify-center gap-3 mb-2">
            <PiFireFill fontSize={25} className="text-orange-600"/>
            <p className="text-lg">تازه‌ترین پست ها</p>
           
        </div>
        <div >
         {isLoad?
          <>
          <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 3000, // Set autoplay delay in milliseconds
                disableOnInteraction: false, // Allows autoplay to continue even after user interaction
              }}
              pagination={{ clickable: true }}
              navigation
              loop={true} // Enables looping of slides
            >
             {posts?.map((item:any,idx:number)=>(
               idx<6 &&<SwiperSlide key={idx}>
                <img src={showImage(item.header_image)} className='w-full h-[200px] rounded-lg rounded-t-none bg-base-300 opacity-75'/>
              </SwiperSlide>
              // idx<4 &&  <div className={'cursor-pointer p-2 border-t'} key={idx} onClick={()=>navigate(`/posts/${item.post_id}`)}>
              //   <p className='text-lg'>{item.title}</p>
              //   <div className='flex text-sm text-gray-600 items-center'>
              //     <PiClock fontSize={15}/>
              //     <span>{item.persian_date}</span>
              //   </div>
              // </div>
            
            ))}
            </Swiper>
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
