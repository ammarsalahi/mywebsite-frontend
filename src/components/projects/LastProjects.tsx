import { Button, Card } from 'antd'
import React from 'react'
import ProjectCard from './ProjectCard'
interface listprops{
  projects:[]|any
}
export default function LastProjects(props:listprops) {
  return (
    <div className='py-7 px-20'>
        <div className='flex justify-start p-5'>
            <p className='text-4xl text-gray-500'>پروژه‌های اخیر</p>
        </div>
       {props.projects?.length>0?
        <>
            <div className="grid grid-cols-4 gap-5 py-10">
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
     
    </div>
  )
}
