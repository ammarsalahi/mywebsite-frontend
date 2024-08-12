import React from 'react'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
import { BASE_URL ,showImage} from '../api/Index'
import { Link } from 'react-router-dom'
import { BiBookReader } from "react-icons/bi";

interface postProps{
  post:any
}
export default function VerticalCard(props:postProps) {
 
  return (
    <Link to={`/posts/${props.post?.post_id}`}>
     <div className="card card-compact bg-base-100 w-76 shadow-xl md:card-move-up">
        <figure>
          <img
            src={showImage(props.post?.header_image)}
            alt="projects" className="h-44 w-full"/>
        </figure>
        <div className="card-body">
          <span>{props.post?.category.name}</span>
          <h2 className="card-title py-3 text-blue-600">{props.post?.title}</h2>
            <div className="flex justify-between py-3 ">
            <div className="flex gap-1 items-center">
                <PiClock fontSize={18}/>
                <span>{props.post?.persian_date}</span>
            </div>
            <div className="flex gap-1 items-center">
                <BiBookReader fontSize={18}/>
                <span>{props.post?.reading_time}</span>
            </div>
            </div>
        </div>
      </div>
      </Link>
  )
}
