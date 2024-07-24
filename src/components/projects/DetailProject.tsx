import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { PiClock, PiEye, PiImage, PiNewspaperClipping, PiPen, PiShareNetwork, PiSubtitles, PiTextAlignRight, PiTrash } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ProjectCard from './ProjectCard'
import { Anchor, Carousel } from 'antd'
import { showImage } from '../api/Index'
import { FaHammer } from 'react-icons/fa6'

interface detailprops{
  project:any;
  others:any;
}
export default function DetailP(props:detailprops) {
  let navigate=useNavigate()

  return (
 <div className='detail-show'>
      <div>
        <div className="ancher-show">
        <div className="py-10">
        <Anchor
        className="text-3xl"
        items={[
          {
            key: 'titles',
            href: '#titles',
            title: <div className="flex gap-4 text-lg items-center">
              <PiSubtitles fontSize={25}/>
              <p>عنوان</p>
            </div>
          },
          
           {
            key: 'texts',
            href: '#texts',
            title: <div className="flex gap-4 text-lg items-center">
            <PiImage fontSize={25}/>
              <p>تصاویر پروژه</p>
            </div>,
          },
            {
            key: 'others',
            href: '#others',
            title: <div className="flex gap-4 text-lg items-center">
            <FaHammer fontSize={25}/>
              <p>پروژه‌های دیگر</p>
            </div>,
          },
          {
            key: 'sharing',
            href: '#sharing',
            title: <div className="flex gap-4 text-lg items-center">
              <PiShareNetwork fontSize={25}/>
              <p>اشتراک گذاری</p>
            </div>,
          },

        
        ]}
      />
      </div>
      </div>
      </div>

      <div className='grid-col' id="titles">
          <img src={showImage(props.project?.header_image)} alt="" className='w-full h-96 rounded-2xl' />
          <div className="flex justify-start pt-3 pb-5 px-4">
                  <div className='flex items-center'>
                    <PiClock fontSize={20}/>
                    <span>{props.project?.persian_date}</span>
                  </div>

          </div>

          <div className="pb-5">
              <p className='text-3xl block'>{props.project?.title}</p>
             
             <div className="py-10" id="texts">
                <div className="py-4">
                  <p className='text-md'>{props.project?.text}</p>
                </div>
             </div>
             <div className="xs:md:sm:px-10 xs:lg:px-20 items-center">
               <Carousel arrows draggable>
                  {props.project.images?.map((item:any,idx:number)=>(
                           <div key={idx}>
                            <img src={showImage(item.img)} width={'100%'} height={200}/>
                            </div>
                        ))}
               </Carousel>
                  </div>
               <div className="py-10">
                <p className="text-xl py-5">تنکولوژی‌های استفاده‌شده</p>
              {props.project?.technologies.length > 0 &&<div className="p-2 grid xs:grid-cols-4 xs:lg:md:grid-cols-8 gap-10">
                  {props.project.technologies?.map((item:any,idx:number)=>(

                      <Link to="/" key={idx}>
                      <div className="bg-blue-200 hover:bg-blue-500 py-1 rounded-full text-lg text-center">
                        {item.name}
                       </div> 
                      </Link>
                  ))}
              </div>}
              </div>
          </div>
     
          {props.others.length>0 && <div className="py-10" id="others">
                <p className='text-xl'>پروژه‌های دیگر</p>
                
                <div className='grid grid-cols-3 gap-5  py-10' id='others'>
                    {props.others?.map((item:any,idx:number)=>(
                      <>{item.project_id!==props.project.project_id && 
                        <ProjectCard project={item} key={idx}/>
                      }</>
                  ))}
                  
                </div> 
          </div>}


      </div>
    </div>
  )
}
