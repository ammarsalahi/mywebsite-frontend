import React from 'react'
import imgs from '../../assets/imgs.png'
import { Card } from 'antd'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'

export default function ListCardPost() {
  return (
    <div className='lg:grid grid-cols-4 gap-5 p-4'>
          <Card className='list-card-post' >
        <div className="gap-0 p-0">
        <div>
        <div >
          <img src={imgs} className='img-card' />
        </div>
      

        </div>
       
      </div>
      </Card>
       <div className='list-card-post'>
        <div className="gap-0 p-0">
        <div>
        <div >
          <img src={imgs} className='img-card' />
        </div>
        <div className='p-4'>
        <p className='text-md text-gray-400 my-3'>دسته بندی</p>
            <p className='text-2xl text-blue-600 pb-10'>عنوان پست!!!</p>
            <div className='px-3 static'>
                <div className="flex justify-between gap-4 py-3 text-gray-600 bottom-0 ">
                    <div className='flex text-sm'>
                      <PiClock fontSize={18}/>
                      <span>سه روز پیش</span>
                    </div>
                    <div className='flex'>
                      <PiEye fontSize={17}/>
                      <span>12</span>
                    </div>
                    <div className='flex'>
                      <PiChat fontSize={15}/>
                      <span>12</span>
                    </div>
                </div>
            </div>
        </div>
            
         
        </div>
       
      </div>
      </div>
    </div>
  )
}




