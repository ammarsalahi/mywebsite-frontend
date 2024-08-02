
import { Button, Card, Spin } from 'antd'
import React from 'react'
import VerticalCard from './VerticalCard'
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai'
import HorizontalCard from './HorizontalCard'

interface listprops{
  posts:[]|any;
  isload:boolean
}
export default function LastPosts(props:listprops) {
  return (
    <div className='lasts'>
        <div className='flex justify-start py-3 px-3 border-r-4 my-3 border-blue-500 '>
            <p className='text-3xl'>پست‌های اخیر</p>
        </div>
    <div>
      
    {props.isload?
     <>
        {props.posts?.length>0 ?
      <> 
          <div className='last-list'>
          {props.posts?.map((item:any,idx:number)=>(
            <div key={idx}>
            <VerticalCard post={item}/>
            </div>
          ))}
        </div>
        {props.posts?.length > 4 && <div className="flex justify-center py-10">
            <Button size='large' type='primary' className=' text-xl  rounded-full' iconPosition='end'>بیشتر</Button>
          </div>}
      </>

     :
        <div className=' no-list'>
          <div className=" p-2 lg:p-4  bg-red-300 text-center rounded-lg">
            <p className='text-xl text-red-700'>هیچ پستی وجود ندارد!!!</p>
          </div>
        </div>
     }
     </>
     :
     <div className="py-10 grid place-items-center">
        <Spin size='large' />
      </div>
     
     }  

      </div>    


   
     </div>
  
   
  )
}


