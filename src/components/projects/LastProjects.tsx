import { Button, Card } from 'antd'
import React from 'react'
import ProjectCard from './ProjectCard'

export default function LastProjects() {
  return (
    <div className='py-7 px-20'>
        <div className='flex justify-start p-5'>
            <p className='text-4xl text-gray-500'>پروژه‌های اخیر</p>
        </div>
        <div className="grid grid-cols-4 gap-5 py-10">
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        </div>
        <div className="flex justify-center py-10">
        <Button size='large' type='primary' className=' text-xl  rounded-3xl' iconPosition='end'>بیشتر</Button>
      </div>
    </div>
  )
}
