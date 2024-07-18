import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
import { BASE_URL ,showImage} from '../api/Index'
import { Link } from 'react-router-dom'

// type post={
//   title:string,
//   category:any,
//   view_count:number,
//   header_img:any
// }

interface postProps{
  post:any
}
export default function VerticalCard(props:postProps) {
 
  return (
    <Link className='px-3 pb-3 shadow-md'  to={`/posts/${props.post?.post_id}`}>
      <img src={showImage(props.post?.header_img)} className='rounded-xl' />
      <div className='p-4'>
        <p className='text-md text-gray-400 my-3'>{props.post?.category.name}</p>
        <p className='text-2xl text-blue-600 pb-10'>{props.post?.title}</p>
        <div className='static px-4'>
            <div className="flex justify-between gap-4 py-3 text-gray-600 bottom-0">
                <div className='flex text-md items-center'>
                <PiClock fontSize={18}/>
                <span>سه روز پیش</span>
                </div>
                <div className='flex items-center'>
                <PiEye fontSize={17}/>
                <span>{props.post?.view_count}</span>
                </div>
               
            </div>
        </div>
        </div>
    </Link>
  )
}
