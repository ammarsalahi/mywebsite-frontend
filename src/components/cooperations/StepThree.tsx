import { Button, Input } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { PiCameraPlus } from 'react-icons/pi';
import { FaChevronRight } from "react-icons/fa6";

interface stepprops{
  prev:any;
}
export default function StepThree(props:stepprops) {
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

        }}
      >
        <form>
          <Input.TextArea
            size='large'
            placeholder='در مورد پروژه بیشتر توضیح بدید...'
            rows={4}
            className='mb-5 rounded-xl'
          />
          <div className='dashed-card p-7 mb-5'>
                      <Button type='text' className='text-lg' icon={<PiCameraPlus/>}>نمونه تصویر</Button>
           </div>  
           <Button size='large' type='primary' block className='mb-5 mt-3 text-xl rounded-full'>تایید</Button>

        </form>

      </Formik>
    </div>
  )
}
