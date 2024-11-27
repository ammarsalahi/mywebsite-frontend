import { Formik } from 'formik'
import React, { useState } from 'react'
import { FaCheck, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa6'
import { Api } from '../api/Index'
import { USERS_PASSWORD_CHANGE } from '../api/Endpoints'
import { AuthConfigHeader } from '../api/Configs'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

interface passProps{
    token:any
}

export default function PasswordChange(props:passProps) {

    const {t}=useTranslation()
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
    <div className='md:px-36 py-5'>
        <Formik
          initialValues={{
            old:"",
            new:"",
            renew:""
          }}
          validate={(values)=>{
            let errors:any={}
            if(!values.old){
              errors.old=t('notempty')
            }
            if(!values.new){
              errors.new=t('notempty')
            }
            if(values.new!==values.renew){
                errors.new=t('pserror')
            }
            
          }}
          onSubmit={(values,{resetForm})=>{
                const formData=new FormData()
                formData.append("old_password",values.old)
                formData.append("new_password",values.new);
                Api.post(USERS_PASSWORD_CHANGE,formData,{
                    headers:AuthConfigHeader(props.token)
                }).then((res)=>{
                    message.success(t('accepted'));
                    resetForm()
                  }).catch((err)=>{
                    message.error(t('notaccepted'))
                })
          }}
        >

        {({handleSubmit,values,handleChange,errors,touched})=>(

        <form onSubmit={handleSubmit} className='py-5'>
            {/* <div className="py-5">
                <p className='text-2xl font-semibold text-center'>تغییر گذرواژه کاربری</p>
            </div> */}
            <div>
                <div className="label">
                    <div className="label-alt text-base">{t('psch1')}</div>
                </div>
                <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                    <FaLock className='text-gray-500'/>
                    <input type={show.old?"text":"password"} className="grow" value={values.old} onChange={handleChange} name="old"/>
                    {show.old ==false?
                        <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('old',true)}/>
                        :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('old',false)}/>}
                </label>
                <div className="label p-0 mb-2">
                    {errors.old && touched.old &&<div className="label-alt text-base text-red-500">{errors.old.toString()}</div>}
                </div>
            </div> 
            <div>
                <div className="label">
                    <div className="label-alt text-base">{t('psch2')}</div>
                </div>
                <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                    <FaLock className='text-gray-500'/>
                    <input type={show.new?"text":"password"} className="grow" value={values.new} onChange={handleChange} name="new"/>
                    {show.new ==false?
                        <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('new',true)}/>
                        :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('new',false)}/>}
                </label>
                <div className="label p-0 mb-2">
                    {errors.new && touched.new &&<div className="label-alt text-base text-red-500">{errors.new.toString()}</div>}
                </div>
            </div>
            <div>
                <div className="label">
                    <div className="label-alt text-base">{t('psch3')}</div>
                </div>
                <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                <FaLock className='text-gray-500'/>
                <input type={show.renew?"text":"password"} className="grow" value={values.renew} onChange={handleChange} name="renew"/>
                {show.renew ==false?
                        <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('renew',true)}/>
                        :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowChange('renew',false)}/>}
                </label>
                <div className="label p-0 mb-2">
                    {errors.renew && touched.renew &&<div className="label-alt text-base text-red-500">{errors.renew.toString()}</div>}
                </div>
            </div>      
                <button className='btn-blue rounded-2xl mt-7 w-full text-base' type='submit'>
                    <FaCheck/>  
                        {t('agree')}
                </button>

        </form>
    )}
    </Formik>

    </div>
  )
}
