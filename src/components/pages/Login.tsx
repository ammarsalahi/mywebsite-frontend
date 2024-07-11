import { Button, Card, Input } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { AiOutlineKey, AiOutlineUser } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import img from '../../assets/codeimg.jpg'
export default function 
() {
  return (
    <div className="login-page" style={{backgroundImage:`url(${img})`}}>
        <div></div>
        <div className='login-card'>
            <div className='p-10 py-20 rounded-xl'>
               <p className='text-3xl  mb-10 text-center'>ورود کاربر</p>
             <Formik
                initialValues={{
                    username:"",
                    password:""
                }}
                onSubmit={(values)=>{

                }}
            >
            {({handleSubmit,values,handleChange,errors,touched})=>(
                <form onSubmit={handleSubmit}>
                    <Input
                      size='large'
                      className='mb-5 p-2 rounded-full '
                      placeholder='نام کاربری'
                      allowClear
                      prefix={<AiOutlineUser fontSize={20}/>}
                      value={values.username}
                      name="username"
                      onChange={handleChange}
                    />
                    {errors.username&&<div className='text-start text-red-500'>{errors.username}</div>}
                    <Input.Password
                        size='large'
                        className='mb-5 p-2 rounded-full'
                        placeholder='گذرواژه'
                        prefix={<AiOutlineKey fontSize={20}/>}
                        value={values.password} 
                        name='password'
                        onChange={handleChange}
                    />
                    {errors.password&& touched.password &&<div className='text-start text-red-500'>{errors.password}</div>}
                    <Button type='primary' block className='shadow-lg mb-10 rounded-full' size='large'
                      onClick={()=> handleSubmit()}
                    >
                        تایید
                    </Button>
                </form>

            )}
                
            </Formik> 

            </div>
            <div className='bg-blue-500 rounded-e-xl'></div>

        </div>
        <div></div>
    </div>
  )
}
