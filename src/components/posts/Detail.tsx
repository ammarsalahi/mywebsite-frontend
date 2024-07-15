import React, { useState } from 'react'
import imgs from '../../assets/bgs.jpg'
import { ListGroup } from 'react-bootstrap'
import VerticalCard from './VerticalCard'
import { PiSubtitles, PiTextAlignRight,PiNewspaperClipping, PiPen, PiTrash, PiClock, PiEye, PiShareNetwork } from 'react-icons/pi'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { MenuProps } from 'antd'


interface detailprops{
  post:any;
}
export default function Detail(props:detailprops) {
  let navigate=useNavigate();


  const DeletePost=()=>{
    Swal.fire({
      title: "برای حذف پست گذرواژه را وارد کنید:",
      input: "password",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      cancelButtonText:"بی‌خیال",
      confirmButtonText: "تایید",
      showLoaderOnConfirm: true,
    });
    //   preConfirm: async (login) => {
    //     try {
    //       const githubUrl = `
    //         https://api.github.com/users/${login}
    //       `;
    //       const response = await fetch(githubUrl);
    //       if (!response.ok) {
    //         return Swal.showValidationMessage(`
    //           ${JSON.stringify(await response.json())}
    //         `);
    //       }
    //       return response.json();
    //     } catch (error) {
    //       Swal.showValidationMessage(`
    //         Request failed: ${error}
    //       `);
    //     }
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url
    //     });
    //   }
    //});
  }

 
  return (
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
        </div>
        <div className="py-10">
            <ListGroup as="ul" className='group-list'>
                <ListGroup.Item as='li' className='group-item flex gap-3' onClick={()=>navigate('/posts/edit/1234')}>
                    <PiPen fontSize={25}/>
                    ویرایش
                </ListGroup.Item>
                <ListGroup.Item as='li' className='group-item flex gap-3' onClick={DeletePost}>
                    <PiTrash fontSize={25}/>
                    حذف
                </ListGroup.Item>
            </ListGroup>
        </div>
        </div>

      

      </div>
      <div className='col-span-3' id="titles">
          <img src={props.post?.header_image.url} alt="" className='w-full h-96 rounded-2xl' />
          <div className="flex justify-between pt-3 pb-5 px-4">
              <p className=' text-gray-700 text-lg'>{props.post?.category.name}</p>
                  <div className='flex items-center'>
                    <PiClock fontSize={20}/>
                    <span>سه روز پیش</span>
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
             </div>
           
              

          </div>
     
          <div className="py-10">
                <p className='text-xl'>پست‌های مشابه</p>
                {/* <div className='grid grid-cols-3 gap-5  py-10' id='others'>
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                  
                </div> */}
          </div>


      </div>
    </div>
  )
}
