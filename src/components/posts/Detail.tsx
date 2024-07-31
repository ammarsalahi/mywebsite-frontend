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
import newPosts from './newPosts'
import {  PiFireFill } from 'react-icons/pi'
import { Api } from '../api/Index'
import { NEW_POSTS } from '../api/Endpoints'
import NewPosts from './newPosts'
interface detailprops{
  post:any;
  others:any;
}
export default function Detail(props:detailprops) {
  const items=[
      {
        key: 'titles',
        href: '#titles',
        title: <div className="flex gap-4 text-xl items-center">
          <PiSubtitles fontSize={30}/>
          <p>عنوان</p>
        </div>,
      },
       {
        key: 'texts',
        href: '#texts',
        title: <div className="flex gap-4 text-xl items-center">
        <PiTextAlignRight fontSize={30}/>
          <p>متن پست</p>
        </div>,
      },
        {
        key: 'others',
        href: '#others',
        title: <div className="flex gap-4 text-xl items-center">
        <PiNewspaperClipping fontSize={30}/>
          <p>پست‌های مشابه</p>
        </div>,
      },
      {
        key: 'sharing',
        href: '#sharing',
        title: <div className="flex gap-4 text-xl items-center">
          <PiShareNetwork fontSize={30}/>
          <p>اشتراک گذاری</p>
        </div>,
      },
    
  ]
  let navigate=useNavigate();


 
  return (
    <div className='detail-show '>
      <div className="minicol">
        <div className="ancher-show">
            <div className="py-5">
              <Anchor
              affix={false}
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
          <img src={showImage(props.post?.header_img)} alt="" className='w-full h-96 rounded-2xl' />
          <div className="flex justify-between py-3 px-4">
              <p className=' text-gray-700 text-lg'>{props.post?.category.name}</p>
                  <div className='flex items-center text-md'>
                    <PiClock />
                    <span>{props.post?.persian_date}</span>
                  </div>

                  
          </div>

          <div className="py-5">
              <p className='text-3xl'>{props.post?.title}</p>
             
             <div className="py-10" id="texts">
                <p className='text-md'>{props.post?.header}</p>
                <div className="py-4">
                  <div dangerouslySetInnerHTML={{ __html: props.post?.text }} />
                </div>
             </div>
              

              {props.post?.keywords.length > 0 &&
            <div className="pb-20 mt-20 pt-5 border-t">
              <p className="text-xl">#کلمات کلیدی</p>
              <div className="py-6 grid lg:grid-cols-8 gap-5">
                  {props.post.keywords?.map((item:any,idx:number)=>(
                      <Link to="/" className='p-4 rounded-lg' key={idx}>    
                          <button  className='py-2 px-10 bg-blue-50  rounded-full hover:bg-blue-500 hover:text-white'>{item.name}</button>
                      </Link>
                  ))}
              </div>
              </div>}
          </div>
          
          {props.others.length>0 && <div className="pb-16 pt-5 border-t " id="others">
                <p className='text-xl'>پست‌های مشابه</p>
                
                <div className='grid lg:grid-cols-3 gap-5  py-10' id='others'>
                    {props.others?.map((item:any,idx:number)=>(
                        <VerticalCard post={item} key={idx}/>
                    ))}
                  
                </div> 
          </div>}


      </div>
    </div>
  )
}
