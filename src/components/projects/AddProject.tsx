import { Input,Button } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { PiCameraPlus } from 'react-icons/pi'
import imgs from '../../assets/bgs.jpg'

export default function AddProject() {
  return (
    <div className='py-10 xl:px-60 lg:px-60 md:px-20 sm:px-10'>
      <p className='pb-10 text-center text-xl'>افزودن پروژه جدید</p>        
      <Formik
         initialValues={{
            title:'',
            text:''
         }}
         onSubmit={(values)=>{

         }}
         >
        {({handleSubmit,values,handleChange,errors,touched})=>(

            <form onSubmit={handleSubmit}>
                <Input 
                    placeholder='عنوان پروژه' size='large' 
                    className='mb-4 rounded-xl'
                    value={values.title} onChange={handleChange}
                    name="title" allowClear/>

                    <div className='dashed-card p-16 mb-4'>
                      <Button type='text' className='text-lg' icon={<PiCameraPlus/>}>تصویر اصلی پروژه</Button>
                    </div>    
                <Input.TextArea placeholder='توضیحات' rows={5} size='large' name="text" value={values.text} onChange={handleChange} className='mb-4'/>
                 <p className='text-lg text-center text-gray-500 mb-3'>افزودن تصاویر</p>
                <div className='flex justify-start gap-4 mb-5'>
                  <div className='dashed-card p-5 mb-4'>
                    <Button type='text' icon={<AiOutlinePlus fontSize={30} color='gray'/>} />
                  </div>
                  <div className="p-2">
                    <img src={imgs}  width={100} height={100} className='rounded-xl'/>
                  </div>
                  <div className="p-2">
                    <img src={imgs}  width={100} height={100} className='rounded-xl'/>
                  </div>
                  <div className="p-2">
                    <img src={imgs}  width={100} height={100} className='rounded-xl'/>
                  </div>
                </div>
                <div className="flex justify-between gap-3">
                  <Button type='text' className='text-xl w-full bg-gray-200' size='large' icon={<AiOutlineClose/>}>انصراف</Button>
                  <Button type='primary' className='text-xl w-full' size='large' icon={<AiOutlineCheck/>}>تایید</Button>
                </div>    
            </form>
        )}

        </Formik>
    </div>
  )
}
