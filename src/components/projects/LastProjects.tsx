import { Button, Card, Spin } from 'antd'
import React from 'react'
import ProjectCard from './ProjectCard'
interface listprops{
  projects:[]|any;
  isload:boolean
}
export default function LastProjects(props:listprops) {
  return (
    <div className='lasts'>
        <div className='flex justify-start py-4 px-5 border-r-4 my-3 border-blue-500 '>
            <p className='text-4xl text-gray-500'>پروژه‌های اخیر</p>
        </div>
          
    {props.isload?
     <>
       {props.projects?.length>0?
        <>
            <div className="last-list">
              {props.projects?.map((item:any,idx:number)=>(
                <ProjectCard project={item} key={idx}/>
              ))}
            </div>
           {props.projects?.length > 4 && <div className="flex justify-center py-10">
            <Button size='large' type='primary' className=' text-xl  rounded-3xl' iconPosition='end'>بیشتر</Button>
          </div>}
        </>
        :
          <div className='no-list'>
            <div className=" p-2 lg:p-4 bg-red-300 text-center rounded-lg">
              <p className='text-xl text-red-700'>هیچ پروژه‌ای وجود ندارد!!!</p>
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
  )
}
