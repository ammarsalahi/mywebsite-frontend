import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Button, Input } from 'antd';
import { PiCameraPlus } from 'react-icons/pi';
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Formik } from 'formik';

interface editprops{
    id:any
}
export default function EditPost(props:editprops) {
  return (
    <div className='py-10 xl:px-40 lg:px-40 md:px-20 sm:px-10'>
    <p className='py-10 text-center text-xl'>افزودن پست جدید</p>
    <Formik
       initialValues={{
        title:"",
        texts:"",
       }}
       onSubmit={(values)=>{
        
    
          
       }}
       >
      {({handleSubmit,values,handleChange,errors,touched})=>(

          <form onSubmit={handleSubmit}>
              <Input 
                  placeholder='عنوان پست' size='large' 
                  className='mb-4 rounded-xl'
                  value={values.title}/>
                <div className='flex justify-center p-10 cursor-pointer rounded-xl border-blue-100 border-2 border-dashed mb-4'>
                    <Button type='text' className='text-lg' icon={<PiCameraPlus/>}>تصویر سرتیتر پست</Button>
                </div>
                <FroalaEditorComponent tag='textarea'/> 
                <div className='flex gap-2 pt-4 pb-10'>
                    <Input size="large" className='rounded-xl lg:w-64 xl:w-64 md:w-80' placeholder='کلیدواژه...' />       
                    <Button  type='primary' className='rounded-full mt-1' icon={<AiOutlinePlus fontSize={20}/>}/>
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
