import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { BASE_URL ,showImage} from '../api/Index'
import { BiBookReader } from "react-icons/bi";

interface postProps{
  post:any;
  theme:string;
}

export default function HorizontalCard(props:postProps) {
  return (
  <div className={`relative my-5 card`}>
    <Link to={`/posts/${props.post?.post_id}`}>
      <div className="card-body p-2">
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 px-2">
            
            <p className='text-md  mb-3'>{props.post?.category.name}</p>
            <p className='text-2xl '>{props.post?.title}</p>
            <p className='text-lg  mt-3'>{props.post?.header}</p>
            <div className='static'>
                <div className="flex justify-start gap-10  absolute bottom-5 right-5 mt-3">
                <div className='flex items-center'>
                <PiClock fontSize={18}/>
                <span>{props.post?.persian_date}</span>
                </div>
                <div className='flex items-center'>
                    <BiBookReader fontSize={18}/>
                     <span>{props.post?.reading_time}</span>
                </div>
               
                </div>
            </div>
         
        </div>
        <div className=''>
          <img src={showImage(props.post?.header_image)} className='w-full h-52 rounded-2xl bg-base-200'  />
        </div>
      </div>
      </div>
       
    </Link>
    </div>
  )
}
