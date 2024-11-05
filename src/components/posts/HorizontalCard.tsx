import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { BASE_URL ,showImage} from '../api/Index'
import { BiBookReader, BiCategory } from "react-icons/bi";

interface postProps{
  post:any;
  theme:string;
}

export default function HorizontalCard(props:postProps) {
  return (
    <div>
      <div className="flex my-4 w-full gap-5 border-b border-base-300 pb-5" >
        <img src={showImage(props.post?.header_image)} className='w-[400px] h-[200px] rounded-lg bg-base-200'  />
        <div className='relative px-4 w-full'>
          <p className='text-2xl font-semibold mb-5'>{props.post?.title}</p>
          <p className='text-base  mt-3'>{props.post?.header}</p>
          <div className='absolute bottom-3 right-0'>
          <div className="flex justify-start gap-5 pt-10">
                <Link 
                    to={`/categories/${props.post?.category.name}`} 
                    className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 px-5 hover:text-white  rounded-full flex items-center gap-2 text-xl'
                >
                   <BiCategory fontSize={18}/>
                  <p className='text-lg'>{props.post?.category.name}</p>
                </Link>
                  <div className='flex items-center text-base'>
                    <PiClock />
                    <span>{props.post?.persian_date}</span>
                  </div>  
                  <div className="flex gap-1 items-center text-sm">
                    <BiBookReader fontSize={18}/>
                  <span>{props.post?.reading_time}</span>
                </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  // <div className={`relative my-5 card`}>
  //   <Link to={`/posts/${props.post?.post_id}`}>
  //     <div className="card-body p-2">
  //     <div className="grid grid-cols-3 gap-4 ">
  //       <div className="col-span-2 px-2">
            
  //           <p className='text-md  mb-3'>{props.post?.category.name}</p>
  //           <p className='text-2xl '>{props.post?.title}</p>
  //           <p className='text-lg  mt-3'>{props.post?.header}</p>
  //           <div className='static'>
  //               <div className="flex justify-start gap-10  absolute bottom-5 right-5 mt-3">
  //               <div className='flex items-center'>
  //               <PiClock fontSize={18}/>
  //               <span>{props.post?.persian_date}</span>
  //               </div>
  //               <div className='flex items-center'>
  //                   <BiBookReader fontSize={18}/>
  //                    <span>{props.post?.reading_time}</span>
  //               </div>
               
  //               </div>
  //           </div>
         
  //       </div>
  //       <div className=''>
  //         <img src={showImage(props.post?.header_image)} className='w-full h-52 rounded-2xl bg-base-200'  />
  //       </div>
  //     </div>
  //     </div>
       
  //   </Link>
  //   </div>
  )
}
