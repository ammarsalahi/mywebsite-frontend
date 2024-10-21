import { Formik } from 'formik'
import React, { useState } from 'react'
import { FaCheck, FaEye, FaLock, FaEyeSlash, FaUser } from 'react-icons/fa6'
import { PiSunFill } from 'react-icons/pi'
import { Api } from '../api/Index'
import { SIGNIN } from '../api/Endpoints'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { tokenSelector } from '../states/Selectors'
import lightIcon from '../../assets/icon-light.png'
import {motion} from 'framer-motion'


interface FormErrors{
  username?:string 
  password?:string
}

export default function Signin() {
   let navigate=useNavigate();
   const [show,setShow]=useState(false);
   const [token,setToken]=useRecoilState(tokenSelector);
   
  message.config({
    top: document.documentElement.clientHeight - 100,
  });
  const handleShowPass=()=>{
    setShow(!show);
  }

  return (
    <div className="grid h-screen place-items-center">
  <div className='p-10'>
    <div className="card border rounded-2xl shadow-lg">
      <div className="card-body p-0">
        <div className="grid grid-cols-2">
          <div className='py-10 px-10'>
            <div className="flex justify-center items-center">
            <button className='btn btn-ghost btn-sm text-2xl'>
                <PiSunFill />
             </button>
            </div>
            <div className='py-10'>
                            <p className="text-2xl font-semibold mb-14 text-center">ورود کاربر</p>
              <Formik
              
              initialValues={{
                username:"",
                password:"",
              }}
              validate={(values)=>{
                let errors:FormErrors={}
                if(!values.username){
                  errors.username="این فیلد نمی تواند خالی باشد!"
                }
                if(!values.password){
                  errors.password="این فیلد نمی تواند خالی باشد!"
                }
                return errors
              }}
              onSubmit={(values)=>{
                  const data=new FormData()
                  data.append('username',values.username)
                  data.append('password',values.password)
                  Api.post(SIGNIN,data).then((res)=>{
                    message.success("ورود با موفقیت انجام شد")
                    setToken({
                      access:res.data.access,
                      refresh:res.data.refresh
                    })
                    navigate('/');
                  }).catch((err)=>{
                    message.error('نام کاربری یا گذرواژه اشتباه است!')
                  })
              }}
              >
                {({handleSubmit,values,handleChange,errors,touched})=>(
                      <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <label className="input input-bordered flex items-center rounded-2xl gap-2">
                            <FaUser className='text-gray-500'/>
                              <input 
                                type="text" className="grow" 
                                value={values.username} name="username"
                                onChange={handleChange} placeholder="نام کاربری" 
                              />
                          </label>
                          {errors.username &&<div className="label">
                             <div className="label-alt text-red-500">{errors.username.toString()}</div>
                          </div>}
                        </div>
                          <div className="mb-6">
                            <label className="input input-bordered flex items-center rounded-2xl gap-2">
                              <FaLock className='text-gray-500'/>
                              <input 
                                type={show?"password":"text"} className="grow" placeholder="گذرواژه" 
                                value={values.password} name="password" onChange={handleChange}
                              />
                              {show ?
                                <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowPass}/>
                                :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowPass}/>}

                            </label>
                             {errors.password && touched.password &&<div className="label">
                             <div className="label-alt text-red-500">{errors.password.toString()}</div>
                          </div>}
                          </div>
                         
                          <button type='submit' className='btn-blue rounded-2xl text-lg font-semibold'>
                              تایید
                              <FaCheck/>
                          </button>
                          </form>
                )}
              </Formik>
             
              
            </div>
          </div>
          <div className=' flex justify-center items-center h-100 bg-blue-500 border border-blue-500 rounded-e-2xl'>
            <Link to={'/'}>
              {/* <img src={lightIcon} className='w-[160px] h-[160px]' /> */}
              <motion.img
                src={lightIcon}
                className="w-20  lg:w-40 "
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 30,
                  repeat:Infinity,
                  repeatType:"reverse"
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
