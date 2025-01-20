// import React, { useState ,useEffect} from 'react'
// import { PiClock, PiFireFill } from 'react-icons/pi'
// import { Api, showImage } from '../api/Index'
// import { NEW_POSTS } from '../api/Endpoints'
// import { Link, useNavigate} from 'react-router-dom'
// import { Spin } from 'antd';


// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// interface postProps{
//   theme:string
// }

// export default function NewPosts(props:postProps) {
//   let navigate=useNavigate()
//   const [posts,setPosts]=useState<any>([])
//   const [isLoad,setisLoad]=useState(false)
//   const getNewPosts=async()=>{
//     await Api.get(NEW_POSTS).then((res)=>{
//       setPosts(res.data);
//       setisLoad(true)
//     })
//   }
//   useEffect(() => {
//     getNewPosts()
  
//   }, [])
  
//   return (
//     <div>
   
//       {posts.length&&
//         <div className='pt-5'>
//            <div className='flex justify-start py-2  text-center mb-5 '>
//             {/* <p className='text-xl font-bold'>پست‌های اخیر</p> */}
//              <PiFireFill fontSize={25} className="text-orange-600"/>
//             <p className="text-lg">تازه‌ترین پست ها</p>
//           </div>
//           <div className='grid grid-col-1'>
//           {posts?.map((item:any,idx:number)=>(
//               idx<4 &&<Link to={`/posts/${item.post_id}`} key={idx} className='my-2 py-3 border-b border-base-100'>
//                 <div className="">
//                    <img src={showImage(item.header_image)} className='w-full h-[40px] bg-base-300 rounded-xl'/>
//                     <span>{item.title}</span>
//                 </div>
//               </Link>
//           ))}
//           </div>
//         </div>
//       // <div className={`card-${props.theme} fresh bg-blue-500`}>
//       //   <div className="flex items-center justify-center gap-3 mb-2">
           
           
//       //   </div>
//       //   <div >
//       //    {isLoad?
//       //     <>
//       //     <Swiper
//       //         modules={[Autoplay, Pagination, Navigation]}
//       //         spaceBetween={0}
//       //         slidesPerView={1}
//       //         autoplay={{
//       //           delay: 5000, // Set autoplay delay in milliseconds
//       //           disableOnInteraction: false, // Allows autoplay to continue even after user interaction
//       //         }}
//       //         pagination={{ clickable: true }}
//       //         navigation
//       //         loop={true} // Enables looping of slides
//       //       >
//       //        {posts?.map((item:any,idx:number)=>(
//       //          idx<6 &&
//       //          <SwiperSlide key={idx}>
//       //           <div>
//       //             <img src={showImage(item.header_image)} className='w-full h-[230px] rounded-none bg-base-300 opacity-75'/>
//       //             <div className='p-4 text-center bg-base-300'>
//       //               <p>{item.title}</p>
//       //             </div>
//       //           </div>
//       //         </SwiperSlide>
             
            
//       //       ))}
//       //       </Swiper>
//       //          </>
//       //   :
//       //       <div className="py-10 grid place-items-center">
//       //          <Spin className="text-red-200"/>
//       //       </div>
//       //   }
//       //       </div>
//       //     </div>
          
//           }
       
//     </div>
//   )
// }
