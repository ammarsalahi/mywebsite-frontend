import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { BASE_URL ,showImage} from '../api/Index'
import { BiBookReader } from "react-icons/bi";

interface postProps{
  post:any
}

export default function HorizontalCard(props:postProps) {
  return (
  <div className='relative py-4  my-5 px-6 border-y border-gray-100 bg-white '>
    <Link to={`/posts/${props.post?.post_id}`}>
        <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 ">
            
            <p className='text-md text-gray-400 mb-3'>{props.post?.category.name}</p>
            <p className='text-2xl text-blue-600'>{props.post?.title}</p>
            <p className='text-lg text-gray-500 mt-3'>{props.post?.header}</p>
            <div className='static'>
                <div className="flex justify-start gap-10 text-gray-500 absolute bottom-5 right-5 mt-3">
                <div className='flex items-center'>
                <PiClock fontSize={18}/>
                <span>{props.post?.persian_date}</span>
                </div>
                <div className='flex items-center'>
                    <BiBookReader fontSize={18}/>
                     <span>خواندن ۲ دقیقه</span>
                </div>
               
                </div>
            </div>
         
        </div>
        <div className=''>
          <img src={showImage(props.post?.header_img)} className='w-full h-48 rounded-2xl'  />
        </div>
      </div>
    </Link>
    </div>
  )
}
