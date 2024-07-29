import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { PiClock, PiEye, PiImage, PiNewspaperClipping, PiPen, PiShareNetwork, PiSubtitles, PiTextAlignRight, PiTrash } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ProjectCard from './ProjectCard'
import { Anchor, Carousel } from 'antd'
import { showImage } from '../api/Index'
import { FaHammer } from 'react-icons/fa6'
import NewPosts from '../posts/newPosts';
import ImageCarousel from './ImageCarousel'

interface detailprops{
  project:any;
  others:any;
}
export default function DetailP(props:detailprops) {
  const items=[
          {
            key: 'titles',
            href: '#titles',
            title: <div className="flex gap-4 text-xl items-center">
              <PiSubtitles fontSize={30}/>
              <p>عنوان</p>
            </div>
          },
          
           {
            key: 'texts',
            href: '#texts',
            title: <div className="flex gap-4 text-xl items-center">
            <PiImage fontSize={30}/>
              <p>تصاویر پروژه</p>
            </div>,
          },
            {
            key: 'others',
            href: '#others',
            title: <div className="flex gap-4 text-xl items-center">
            <FaHammer fontSize={30}/>
              <p>پروژه‌های دیگر</p>
            </div>,
          },
          {
            key: 'sharing',
            href: '#sharing',
            title: <div className="flex gap-4 text-xl items-center">
              <PiShareNetwork fontSize={30}/>
              <p>اشتراک گذاری</p>
            </div>,
          }]
  let navigate=useNavigate()

  return (
 <div className='detail-show'>
      <div className="minicol">
        <div className="ancher-show">
          <div>
              <Anchor
              className="text-3xl"
              items={items}
            />
          </div>
          <div>
          <NewPosts />

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
                <div>
                         <ImageCarousel interval={1000}>
                            {props.project.images?.map((item:any,idx:number)=>(
                            <div key={idx}>
                              <img src={showImage(item.img)} className="w-full h-80 rounded-xl shadow-xl" />
                            </div>
                            ))}
                          </ImageCarousel>
               </div>
                     {props.project?.technologies.length > 0 &&
                  <div className="pb-20 mt-40 pt-5 border-t">
                      <p className="text-xl">تنکولوژی‌های استفاده‌شده</p>
                 <div className="px-2 py-5 grid xs:grid-cols-4 xs:lg:md:grid-cols-6 gap-10">
                        {props.project.technologies?.map((item:any,idx:number)=>(

                            <Link to="/" key={idx}>
                            <div className="bg-blue-200 hover:text-white hover:bg-blue-500 py-1  rounded-full text-lg text-center">
                              {item.name}
                             </div> 
                            </Link>
                        ))}
                    </div>
              </div>}
          </div>
     
          {props.others.length>0 && <div className="pb-16 pt-5 border-t " id="others">
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
