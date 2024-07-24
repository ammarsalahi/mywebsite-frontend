import React, { useState } from 'react'
import imgs from '../../assets/bgs.jpg'
import { ListGroup } from 'react-bootstrap'
import VerticalCard from './VerticalCard'
import { PiSubtitles, PiTextAlignRight,PiNewspaperClipping, PiPen, PiTrash, PiClock, PiEye, PiShareNetwork } from 'react-icons/pi'

import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { MenuProps } from 'antd'
import { showImage } from '../api/Index'
import { Anchor } from 'antd';


interface detailprops{
  post:any;
  others:any;
}
export default function Detail(props:detailprops) {
  let navigate=useNavigate();


 
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
            </div>,
          },
           {
            key: 'texts',
            href: '#texts',
            title: <div className="flex gap-4 text-lg items-center">
            <PiTextAlignRight fontSize={25}/>
              <p>متن پست</p>
            </div>,
          },
            {
            key: 'others',
            href: '#others',
            title: <div className="flex gap-4 text-lg items-center">
            <PiNewspaperClipping fontSize={25}/>
              <p>پست‌های مشابه</p>
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
        {/* <ListGroup as="ul" className='group-list'>
          <ListGroup.Item as="li" className='group-item'>
            <a href="#titles" className='text-lg flex gap-3'>
              <PiSubtitles fontSize={25}/>
              عنوان پست</a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className='group-item'>
          <a href="#texts" className='text-lg flex gap-3'>
            <PiTextAlignRight fontSize={25}/>
            متن پست</a>
          </ListGroup.Item>
       
          <ListGroup.Item as="li" className='group-item'>
            <a href="#others" className='text-lg flex gap-3'>
            <PiNewspaperClipping fontSize={25}/>
            پست‌های مشابه
            </a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className='group-item flex gap-3'>
            <PiShareNetwork fontSize={25}/>
             اشتراک گذاری 
          </ListGroup.Item>
        </ListGroup>
        </div> */}
        </div>
      </div>
        

      

      </div>
      <div className='grid-col' id="titles">
          <img src={showImage(props.post?.header_img)} alt="" className='w-full h-96 rounded-2xl' />
          <div className="flex justify-between pt-3 pb-5 px-4">
              <p className=' text-gray-700 text-lg'>{props.post?.category.name}</p>
                  <div className='flex items-center'>
                    <PiClock fontSize={20}/>
                    <span>{props.post?.persian_date}</span>
                  </div>

                  {/* <div className='flex gap-1 items-center'>
                    <PiEye fontSize={20}/>
                    <span>12</span>
                  </div> */}
          </div>

          <div className="pb-5">
              <p className='text-3xl'>{props.post?.title}</p>
             
             <div className="py-10" id="texts">
                <p className='text-md'>{props.post?.header}</p>
                <div className="py-4">
                  <div dangerouslySetInnerHTML={{ __html: props.post?.text }} />
                </div>
             </div>
             
              {props.post?.keywords.length > 0 &&<div className="py-6 grid lg:grid-cols-8 gap-5">
                  {props.post.keywords?.map((item:any,idx:number)=>(
                      <Link to="/" className='p-4 rounded-lg' key={idx}>#{item.name}</Link>
                  ))}
              </div>}
          </div>
     
          {props.others.length>0 && <div className="py-10" id="others">
                <p className='text-xl'>پست‌های مشابه</p>
                
                <div className='grid grid-cols-3 gap-5  py-10' id='others'>
                    {props.others?.map((item:any,idx:number)=>(
                      <>{item.post_id!==props.post.post_id && 
                        <VerticalCard post={item} key={idx}/>
                      }</>
                  ))}
                  
                </div> 
          </div>}


      </div>
    </div>
  )
}
