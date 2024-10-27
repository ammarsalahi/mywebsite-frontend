import React from 'react'
import { PiClock } from 'react-icons/pi'
import { showImage} from '../api/Index'
import { Link, useNavigate } from 'react-router-dom'
import { BiBookReader, BiPencil } from "react-icons/bi";
import { FaTrash } from 'react-icons/fa6';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';


interface postProps{
  post:any;
  deletePost:()=>void;
  theme:string
}
export default function VerticalCard(props:postProps) {
  
  let navigate=useNavigate();

  const handleEdit=(id:string)=>()=>{
    navigate(`/posts/edit/${id}`)
  }
  const token=useRecoilValue(tokenSelector)

 
  return (
   
     <div className={`card-${props.theme}  w-auto rounded-xl hover:shadow-xl card-move-up`}>
         <Link to={`/posts/${props.post?.post_id}`}>
        <div className="card-body p-3">
          <img
            src={showImage(props.post?.header_image)}
            alt="projects" className="h-60 w-full rounded-xl bg-base-300"/>
            <div className='px-2'>
            <span>{props.post?.category.name}</span>
          <h2 className="py-3 font-bold text-xl">{props.post?.title}</h2>
            <div className="flex justify-between py-3 ">
            <div className="flex gap-1 items-center text-base">
                <PiClock fontSize={18}/>
                <span>{props.post?.persian_date}</span>
            </div>
            <div className="flex gap-1 items-center text-base">
                <BiBookReader fontSize={18}/>
                <span>{props.post?.reading_time}</span>
            </div>
            </div>
            </div>
          
        </div>
        </Link>
        {token.access?.length>0 &&<div className="card-actions  flex justify-between py-4 px-5">
          <button 
            className='btn btn-ghost btn-sm text-base text-blue-500'
            onClick={handleEdit(props.post?.post_id)}
          >
            ویرایش                  
            <BiPencil className='text-xl'/>
          </button>
          <button 
            className='btn btn-ghost btn-sm text-base text-red-500'
            onClick={props.deletePost}
          >
            حذف
            <FaTrash className='text-xl'/>
          </button>
        </div>}
      </div>
  )
}
