import { Formik } from 'formik'
import React, { useState } from 'react'
import { FaCheck, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa6'
import { Api } from '../api/Index'
import { USERS_PASSWORD_CHANGE } from '../api/Endpoints'
import { AuthConfigHeader } from '../api/Configs'
import { message } from 'antd'

interface passProps{
    token:any
}

export default function PasswordChange(props:passProps) {

    message.config({
        top: document.documentElement.clientHeight - 100,
    });

    const [show,setShow]=useState({
        old:false,
        new:false,
        renew:false
    })

    const handleShowChange=(name:string,value:boolean)=>()=>{
        setShow({...show,[name]:value})
    }
    
  return (
    <div className='md:px-32 py-5'>
        <Formik
          initialValues={{
            old:"",
            new:"",
            renew:""
          }}
          validate={(values)=>{
            let errors:any={}
            if(!values.old){
              errors.old="این فیلد نمی تواند خالی باشد!"
            }
            if(!values.new){
              errors.new="این فیلد نمی تواند خالی باشد!"
            }
            if(values.new!==values.renew){
                errors.new="گذرواژه‌ها برابر نیستند!"
            }
            
          }}
          onSubmit={(values,{resetForm})=>{
                const formData=new FormData()
                formData.append("old_password",values.old)
                formData.append("new_password",values.new);
                Api.post(USERS_PASSWORD_CHANGE,formData,{
                    headers:AuthConfigHeader(props.token)
                }).then((res)=>{
                    message.success("تغییرات با موفقیت انجام شد");
                    resetForm()
                  }).catch((err)=>{
                    message.error("متاسفانه مشکلی پیش آمد!")
                })
          }}
        >

        {({handleSubmit,values,handleChange,errors,touched})=>(

        <form onSubmit={handleSubmit}>
            <div>
                <div className="label">
                    <div className="label-alt text-base">گذرواژه قبلی</div>
                </div>
                <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                    <FaLock className='text-gray-500'/>
                    <input type={show.old?"text":"password"} className="grow" value={values.old} onChange={handleChange} name="old"/>
                    {show.old ==false?
                        <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('old',true)}/>
                        :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('old',false)}/>}
                </label>
                <div className="label">
                    {errors.old && touched.old &&<div className="label-alt text-base text-red-500">{errors.old.toString()}</div>}
                </div>
            </div> 
            <div>
                <div className="label">
                    <div className="label-alt text-base">گذرواژه جدید</div>
                </div>
                <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                    <FaLock className='text-gray-500'/>
                    <input type={show.new?"text":"password"} className="grow" value={values.new} onChange={handleChange} name="new"/>
                    {show.new ==false?
                        <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('new',true)}/>
                        :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('new',false)}/>}
                </label>
                <div className="label">
                    {errors.new && touched.new &&<div className="label-alt text-base text-red-500">{errors.new.toString()}</div>}
                </div>
            </div>
            <div>
                <div className="label">
                    <div className="label-alt text-base">تکرار گذرواژه جدید</div>
                </div>
                <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                <FaLock className='text-gray-500'/>
                <input type={show.renew?"text":"password"} className="grow" value={values.renew} onChange={handleChange} name="renew"/>
                {show.renew ==false?
                        <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('renew',true)}/>
                        :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('renew',false)}/>}
                </label>
                <div className="label">
                    {errors.renew && touched.renew &&<div className="label-alt text-base text-red-500">{errors.renew.toString()}</div>}
                </div>
            </div>      
                <button className='btn-blue rounded-2xl mt-7 w-full' type='submit'>
                    <FaCheck/>  
                        تایید
                </button>

        </form>
    )}
    </Formik>

    </div>
  )
}
