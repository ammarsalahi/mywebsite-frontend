import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { PiClock, PiEye, PiNewspaperClipping, PiPen, PiShareNetwork, PiSubtitles, PiTextAlignRight, PiTrash } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import imgs from '../../assets/bgs.jpg'
import ProjectCard from './ProjectCard'
import { Carousel } from 'antd'

interface detailprops{
  projects:any;
  others:any;
}
export default function DetailP(props:detailprops) {
  let navigate=useNavigate()

  return (
    <div>

       <div className='py-10 px-20 grid grid-cols-4 gap-6 relative'>
      <div>
        <div className="sticky top-10">
        <div className="py-10">
        <ListGroup as="ul" className='group-list'>
          <ListGroup.Item as="li" className='group-item'>
            <a href="#titles" className='text-lg flex gap-3'>
              <PiSubtitles fontSize={25}/>
              عنوان پست</a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className='group-item'>
          <a href="#texts" className='text-lg flex gap-3'>
            <PiTextAlignRight fontSize={25}/>
            متن پروژه</a>
          </ListGroup.Item>
       
          <ListGroup.Item as="li" className='group-item'>
            <a href="#others" className='text-lg flex gap-3'>
            <PiNewspaperClipping fontSize={25}/>
            پروژه‌های دیگر
            </a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className='group-item flex gap-3'>
            <PiShareNetwork fontSize={25}/>
             اشتراک گذاری 
          </ListGroup.Item>
        </ListGroup>
        </div>
      
        </div>

      

      </div>
      <div className='col-span-3' id="titles">
          <img src={imgs} alt="" className='w-full h-96 rounded-2xl' />
          <div className="flex justify-end pt-3 pb-5 px-4">
              <div className="flex gap-5 text-gray-600">
                  <div className='flex gap-1 items-center'>
                    <PiClock fontSize={20}/>
                    <span>سه روز پیش</span>
                  </div>

                  <div className='flex gap-1 items-center'>
                    <PiEye fontSize={20}/>
                    <span>12</span>
                  </div>
              </div>
          </div>

          <div className="pb-5">
              <p className='text-3xl'>{props.projects?.title}</p>
             
             <div className="py-10" id="texts">
                <p className='text-md'>{props.projects?.text}</p>
             </div>
             <div className="py-5">
                <Carousel arrows infinite className='w-80 h-80'>
                  {props.projects.images?.map((item:any,idx:number)=>(
                      <img src={item.img} alt={`${idx}`} className='rounded-xl' width={400} />
                  ))}
                </Carousel>
             </div>
              

          </div>
     
          <div className="py-10">
                <p className='text-xl'>پروژه‌های دیگر</p>
                {/* <div className='grid grid-cols-3 gap-5  py-10' id='others'>
                  <ProjectCard/>
                  <ProjectCard/>
                  <ProjectCard/>
                  <ProjectCard/>
                  <ProjectCard/>
                  <ProjectCard/>

                </div> */}
          </div>


      </div>
    </div>
    </div>
  )
}
