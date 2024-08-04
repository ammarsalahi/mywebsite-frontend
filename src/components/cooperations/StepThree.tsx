import { Button, Input } from 'antd'
import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { PiCameraPlus } from 'react-icons/pi';
import { FaChevronRight } from "react-icons/fa6";
import { PiPen,PiTrash } from "react-icons/pi";
import { useRecoilValue } from 'recoil';
import { typeSelector, userSelector } from '../states/Selectors';
import { Api } from '../api/Index';
import { COOPERATIONS } from '../api/Endpoints';


interface stepprops{
  prev:any;
}
export default function StepThree(props:stepprops) {

  const fileInput = useRef<any>(null);
  const [imgshow,setImgshow]=useState<any>("");
  const [imgfile,setImgfile]=useState<any>(null);
  const types=useRecoilValue(typeSelector);
  const userdata=useRecoilValue(userSelector);


  const openFile=()=>{
    fileInput.current.click()
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgfile(file)
      setImgshow(URL.createObjectURL(file))
    }
  };
  return (
    <div>
      <div className='flex justify-start gap-5'>
          <button 
          className="btn btn-sm rounded-full btn-error text-white" 
          onClick={props.prev}>
        <FaChevronRight fontSize={20}/>
        </button>         <p className='text-xl pb-10 text-center'>جزئیات بیشتری را در مورد پروژه اضافه کنید</p>
      </div>
      <Formik
        initialValues={{
          text:"",
        }}
        onSubmit={(values)=>{
          const data={
            types:types,
            name:userdata.name,
            project:userdata.project,
            phone_number:userdata.phone,
            email:userdata.email,
            description:values.text,
            website_image:imgfile
          }


          Api.post(COOPERATIONS,data,{
            headers:{
              "Content-Type": "multipart/form-data",
            }
          }).then((res)=>{
              console.log(res.data)
          })
        }}
      >

        {({handleSubmit,values,handleChange,errors,touched})=>(

        <form onSubmit={handleSubmit}>
        <textarea 
          className="textarea textarea-bordered w-full mb-5" 
          placeholder='در مورد پروژه بیشتر توضیح بدید...'
          value={values.text}
          name='text'
          onChange={handleChange}
          rows={4}
        />
            {imgshow==""?<div className='dashed-card p-6 mb-5'>
              <input type='file' hidden ref={fileInput} onChange={handleFileChange} accept="image/png, image/jpg, image/jpeg"/>
              <button className='btn btn-ghost text-lg' onClick={openFile}>
              <PiCameraPlus/>
              افزودن نمونه تصویر
              </button>
            </div>:
            <div className="grid grid-cols-10">
               <div className="pt-5">
                <div className="p-2 cursor-pointer">
                  <PiPen fontSize={40} className="text-blue-600"/>
                </div>
                 <div className="p-2 cursor-pointer">
                  <PiTrash fontSize={40} className="text-red-600"/>
                </div>
               </div>
               <img src={imgshow} className='col-span-9 w-full h-36 border-2 border-gray-300 rounded-lg'/> 
            </div>}             
            <button 
              className='btn  w-full bg-blue-600 text-white hover:bg-blue-600 border border-blue-600 rounded-full'
              onClick={()=>handleSubmit()}
            >
            تایید
            </button>
        </form>
        )}
      </Formik>
    </div>
  )
}
