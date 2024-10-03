import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import {  PiCameraPlusFill, PiNewspaperFill } from 'react-icons/pi'
import bgs from "../../assets/bgs.jpg"

interface formErros{
    title?:string
    header?:string 
    image?:string
    category?:string
    content?:string
}

interface postProps{
  id:number
}
export default function EditPost(props:postProps) {

    const [file, setfile] = useState<File|null>(null);
    const [image,setImage]=useState<string|null>(null);
    const [content,setContent]=useState<string>("");


    const imgRef=useRef<HTMLInputElement|null>(null);



    const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFile=e.target.files?.[0]
        setfile(selectedFile||null);
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const filePreview = URL.createObjectURL(selectedFile);
            setImage(filePreview);  
        } else {
            setImage(null);  
        }
    }
    const handleOpenImage=()=>{
        imgRef.current?.click()
    }
  return (
    <div className='px-32 py-16'>
        <div className="card border rounded-xl">
          <div className="card-body py-10 px-20">
            <Formik
                initialValues={{
                    title:"",
                    header:"",
                    image:"",
                    is_active:false,
                    category:"",
                }}
                validate={(values)=>{
                    let errors:formErros={}
                    if(!values.title){
                        errors.title="عنوان نمی تواند خالی باشد!"
                    }
                    if(!values.header){
                        errors.header="چکیده نمی تواند خالی باشد!"
                    }
                    if(image==null){
                        errors.image="نصویر نمی تواند خالی باشد!"
                    }
                    if(content==""){
                        errors.content="متن نمی تواند خالی باشد!"
                    }
                    if(!values.category){
                        errors.category="دسته‌بندی نمی تواند خالی باشد!"
                    }
                   return errors
                    
                }}
                onSubmit={(values)=>{

                }}
            >
                {({values,handleSubmit,handleChange,errors,touched})=>(
                    <form onSubmit={handleSubmit}>
                            <div className="flex justify-center">
                                <div className="flex gap-2">
                                <PiNewspaperFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">افزودن پست جدید</p>
                                </div>
                            
                            </div>
                            <div className="mb-4">
                                <div className="label mb-1">
                                    <span className="label-text-alt text-base">عنوان پست را وارد کنید</span>
                                    <span className="label-text me-2">{values.title.length}/200</span>
                                </div>
                                <input 
                                value={values.title} name="title" onChange={handleChange}
                                type="text" className="input input-bordered w-full rounded-2xl" 
                                />
                                {errors.title  &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.title?.toString()}</span>
                                </div>}
                                                                
                            </div>
                            <div className="mb-4">
                                <input type="file" accept='image/*' className='hidden' onChange={handleImage} ref={imgRef} />
                                <div className="label">
                                    <span className="label-text-alt text-base">تصویر پست را انتخاب کنید</span>
                                </div>
                             {image? <div className='relative '>
                                <img src={image} alt="" className='h-[250px] w-full rounded-xl' />
                                <button
                                    onClick={handleOpenImage}
                                    type='button'
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-[85%] text-white text-xl font-bold py-2 px-4 rounded-xl"
                                >
                                 <PiCameraPlusFill className='text-xl'/>
                                 تغییر تصویر
                                </button>
                              </div>  
                            :
                            <div className="dashed-card-gray flex justify-center items-center py-16">
                                    <button 
                                        className='btn btn-ghost text-gray-700 hover:bg-blue-100 text-lg' 
                                        onClick={handleOpenImage}
                                        type='button'

                                    >
                                        <PiCameraPlusFill className='text-xl'/>
                                        افزودن تصویر
                                    </button>
                            </div>}
                            {errors?.image &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.image?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-5">
                                <div className="label">
                                    <span className="label-text-alt text-base">چکیده پست را وارد کنید</span>
                                    <span className="label-text me-2">{values.header.length}/400</span>

                                </div>
                                <textarea 
                                    value={values.header} name="header"
                                    className="textarea textarea-bordered w-full rounded-2xl" rows={2}
                                />
                                {errors.header &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.header?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-6">
                                <div className="label">
                                    <span className="label-text-alt text-base">متن پست را وارد کنید</span>
                                </div>
                                <textarea 
                                    className="textarea textarea-bordered w-full rounded-2xl" rows={7}
                                />
                               {content=="" &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base">{errors.title?.toString()}</span>
                                </div>}
                            </div>
                            <div className="mb-10">
                                
                                <div className="md:flex gap-5">
                                    <div className='w-full'>
                                        <div className="label">
                                            <span className="label-text-alt text-base">کلمات کلیدی را اضافه کنید</span>
                                        </div>
                                        <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                                            <input type="text" className="grow"  />
                                            <button className='btn bg-green-300  btn-sm'>
                                            <FaPlus/>
                                            افزودن
                                            </button>
                                        </label>
                                    </div>
                                    <div className='w-full'>
                                        <div className="label">
                                            <span className="label-text-alt text-base">دسته‌بندی را انتخاب کنید</span>
                                        </div>
                                        <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                                            <input type="text" className="grow"/>
                                    
                                        </label>
                                    </div>    
                            </div>
                            
                            </div>
                            <div className="md:flex justify-between items-center mb-5">
                                <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input
                                        type="checkbox"
                                        checked={values.is_active}
                                        name="is_active"
                                        onChange={handleChange}
                                        className="checkbox  border-blue-500 [--chkbg:theme(colors.blue.500)] checked:border-blue-500" 
                                    />
                                    <span className="label-text mx-3 text-lg">این پست قابل مشاهد باشد</span>
                                </label>
                                
                                </div>
                                <button 
                                    className='btn-blue md:w-80 rounded-2xl text-lg font-semibold'
                                    type='submit'
                                >
                                <FaCheck/>
                                    ایجاد پست
                                </button>
                            </div>
                            </form>
                )}
               
            </Formik>
          
          </div>
        </div>
    </div>
  )
}

