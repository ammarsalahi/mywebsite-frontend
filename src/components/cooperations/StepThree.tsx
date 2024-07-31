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
        <Button  icon={<FaChevronRight/>} onClick={props.prev} type="primary" danger/>
         <p className='text-2xl pb-10 text-center'>جزئیات بیشتری را در مورد پروژه اضافه کنید</p>
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
{/* 
<Button className='btn rounded-circle bg-light' 
                                            style={{position:'absolute',zIndex:2,top:'70%',cursor:'pointer'}} 
                                            icon={<PiCameraPlus className='text-lg'/>} 
                                            onClick={openFile}
                                            /> */}
        {({handleSubmit,values,handleChange,errors,touched})=>(

        <form onSubmit={handleSubmit}>
          <Input.TextArea
            size='large'
            placeholder='در مورد پروژه بیشتر توضیح بدید...'
            rows={4}
            className='mb-5 rounded-xl'
            value={values.text}
            name='text'
            onChange={handleChange}
          />
            {imgshow==""?<div className='dashed-card p-7 mb-5'>
              <input type='file' hidden ref={fileInput} onChange={handleFileChange} accept="image/png, image/jpg, image/jpeg"/>
              <Button type='text' className='text-lg' onClick={openFile} icon={<PiCameraPlus/>}>افزودن نمونه تصویر</Button>
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
           <Button 
              size='large' type='primary' block 
              className='mb-5 mt-3 text-xl rounded-full'
              onClick={()=>handleSubmit()}
              >تایید</Button>

        </form>
        )}
      </Formik>
    </div>
  )
}
