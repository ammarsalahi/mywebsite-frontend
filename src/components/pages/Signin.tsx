import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaEye, FaLock, FaEyeSlash, FaUser } from 'react-icons/fa6'
import { PiSunFill } from 'react-icons/pi'
import { Api } from '../api/Index'
import { SIGNIN } from '../api/Endpoints'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { langSelector, themeSelector, tokenSelector } from '../states/Selectors'
import lightIcon from '../../assets/icon-light.png'
import {motion} from 'framer-motion'
import { AiFillMoon, AiFillSun } from 'react-icons/ai'


interface FormErrors{
  username?:string 
  password?:string
}

export default function Signin() {
   let navigate=useNavigate();
   const [show,setShow]=useState(true);
   const [token,setToken]=useRecoilState(tokenSelector);
   const [theme,setTheme]=useRecoilState(themeSelector)
    const [lang,setLang]=useRecoilState(langSelector)

  message.config({
    top: document.documentElement.clientHeight - 100,
  });
  const handleShowPass=()=>{
    setShow(!show);
  }
  
  const handleChangeTheme=()=>{
    if(theme=='light'){
      setTheme('dark')
   }else{
      setTheme('light')
   }
  }

  const handleLang=()=>{
    if(lang=='EN'){
      setLang("FA")
    }else{
      setLang("EN")

    }
  }

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
  },[theme])

  return (
    <div className={theme=="dark"?"bg-gray-900 text-white":"bg-gray-100"}>

<div className="grid h-screen place-items-center">

<div className='p-10'>
  <div className={`card-${theme} border rounded-2xl shadow-lg`}>
    <div className="card-body p-0">
      <div className="grid grid-cols-2">
        <div className='py-10 px-10'>
          <div className="flex justify-center items-center gap-3">
          <button className='btn btn-ghost btn-sm text-2xl' onClick={handleChangeTheme}>
            {theme=="dark"?<AiFillMoon/>: <AiFillSun />}
          </button>
          <button className='btn btn-ghost btn-sm text-xl' onClick={handleLang}>
            {lang}
          </button>
          </div>
          <div className='py-10'>
              <p className="text-2xl font-semibold mb-14 text-center">{lang=="FA"?"ورود کاربر":"User Signin"}</p>
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
                    refresh:res.data.refresh,
                    user:res.data.username
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
                          {lang=="FA" && <FaUser className='text-gray-500'/>}
                            <input 
                              type="text" className={lang=="FA"?"grow":"grow text-end"} 
                              value={values.username} name="username"
                              onChange={handleChange} placeholder={lang=="FA"?"نام کاربری":"username"} 
                            />
                             {lang=="EN" && <FaUser className='text-gray-500'/>}
                        </label>
                        {errors.username &&<div className="label">
                          <div className="label-alt text-red-500">{errors.username.toString()}</div>
                        </div>}
                      </div>
                        <div className="mb-6">
                          <label className="input input-bordered flex items-center rounded-2xl gap-2">
                            {lang=="FA"?
                              <FaLock className='text-gray-500'/>
                              :
                              show?
                              <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowPass}/>
                              :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowPass}/>
                            }
                            <input 
                              type={show?"password":"text"} className={lang=="FA"?"grow":"grow text-end"} 
                               placeholder={lang=="FA"?"گذرواژه":"password"} 
                              value={values.password} name="password" onChange={handleChange}
                            />
                            {lang=="FA"?
                              show?
                              <FaEye className='text-gray-500 cursor-pointer text-xl' onClick={handleShowPass}/>
                              :<FaEyeSlash className='text-gray-500 cursor-pointer text-xl' onClick={handleShowPass}/>
                            :
                              <FaLock className='text-gray-500'/>
                            }
                          </label>
                          {errors.password && touched.password &&<div className="label">
                          <div className="label-alt text-red-500">{errors.password.toString()}</div>
                        </div>}
                        </div>
                      
                        <button type='submit' className='btn-blue w-full hover:w-full rounded-2xl text-lg font-semibold'>
                           {lang=="FA"?"تایید":"Signin"}
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
    </div>
  

  )
}
