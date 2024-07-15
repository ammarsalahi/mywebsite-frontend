
import { Button, Card } from 'antd'
import React from 'react'
import VerticalCard from './VerticalCard'
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai'
import HorizontalCard from './HorizontalCard'

interface listprops{
  posts:[]|any
}
export default function LastPosts(props:listprops) {
  return (
    <div className='py-7 px-20'>
        <div className='flex justify-start py-4 px-5'>
            <p className='text-4xl text-gray-500'>پست‌های اخیر</p>
        </div>
   {props.posts?.length>0 ?
      <>
          <div className='grid grid-cols-4 gap-5  py-5'>
          {props.posts?.map((item:any,idx:number)=>{
            <VerticalCard post={item} key={idx}/>
          })}
        </div>
            <div className="flex justify-center py-10">
            <Button size='large' type='primary' className=' text-xl  rounded-full' iconPosition='end'>بیشتر</Button>
          </div>
      </>

     :
      <></>
     }


   
     </div>
  
   
  )
}


