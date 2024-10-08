import React, { useRef, useState } from 'react'
import { FaCheck, FaHammer, FaPlus, FaTrash } from 'react-icons/fa6'
import { PiCameraPlusFill } from 'react-icons/pi'
import { Formik } from 'formik'
import bgs from '../../assets/bgs.jpg'
import { Api } from '../api/Index'
import { IMAGES, IMAGES_ID, PROJECTS } from '../api/Endpoints'
import { AuthConfigHeaderFile, ConfigHeaderFile } from '../api/Configs'
import { useRecoilValue } from 'recoil'
import { tokenSelector } from '../states/Selectors'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

interface formErrors{
  title?:string;
  header?:string;
}

interface ImageItem{
  id:number 
  img:string
}

interface TechItem{
  id:number;
  name:string
}

export default function AddProject() {
  const [images, setImages] = useState<ImageItem[]|null>(null);
  const [teches,setTeches] = useState<TechItem[]|null>(null);
  const [file,setFile] = useState<File|null>(null);
  const imgRef=useRef<HTMLInputElement|null>(null);


  const token = useRecoilValue(tokenSelector)
  let navigate = useNavigate();

    const handleOpenImage=()=>{
        imgRef.current?.click()
    }

  const addImg = (newimg: ImageItem) => {
        setImages((prevs) => {
            if (prevs === null) {
                return [newimg];
            }
            const exists = prevs.some((img) => img.id === newimg.id);
            if (exists) {
                return prevs;
            }
            return [...prevs, newimg];
        });
    };

    const deleteImg = (imgId: number) => {
    setImages((prevs) => {
        if (prevs === null) {
            return prevs; // No keys to delete
        }
        return prevs.filter((img) => img.id !== imgId);
    });
    };
    const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const selectedFile=e.target.files?.[0]
      
      if (selectedFile){
        const formdata = new FormData()
        formdata.append("img",selectedFile)
        formdata.append("state","to add")

        Api.post(IMAGES,formdata,{headers:ConfigHeaderFile()}).then((res)=>{
            addImg(res.data);
        }).catch((err)=>{
          console.log(err);
          message.error("مشکلی پیش آمد!")
        })
      }
   
  }

  const DeleteImage=(id:number)=>()=>{
    Api.delete(IMAGES_ID(id)).then((res)=>{
        deleteImg(id);
    }).catch((err)=>{
      console.log(err);
      message.error("مشکلی پیش آمد!")
  })
  }
  return (
    <div className='px-32 py-16'>
        <div className="card border rounded-xl">
          <div className="card-body py-10 px-20">
          <Formik
                initialValues={{
                    title:"",
                    header:"",
                    is_active:false,
                }}
                validate={(values)=>{
                    let errors:formErrors={}
                    if(!values.title){
                        errors.title="عنوان نمی تواند خالی باشد!"
                    }
                    if(!values.header){
                        errors.header="چکیده نمی تواند خالی باشد!"
                    }
                    
                   
                   return errors
                    
                }}
                onSubmit={(values)=>{
                  const formdata=new FormData()
                  formdata.append("title",values.title)
                  formdata.append("text",values.header);
                  formdata.append("is_active",String(values.is_active))
                  images?.forEach((img:ImageItem)=>{
                    formdata.append('images',String(img.id))
                  })
                  Api.post(PROJECTS,formdata,{headers:AuthConfigHeaderFile(token)}).then((res)=>{
                      message.success("پروژه با موفقیت ایجاد شد")
                      navigate("/projects")
                  }).catch((err)=>{
                      message.error("متاسفانه مشکلی پیش آمد!")
                  })
                }}
            >
                {({values,handleSubmit,handleChange,errors,touched})=>(
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-10">
                <div className="flex gap-2 items-center">
                <FaHammer className='text-3xl'/>
                <p className="text-2xl text-center font-bold">افزودن پروژه جدید</p>
                </div>
               
              </div>
            <div className="mb-5">
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
        
            <div className="mb-5">
                  <div className="label mb-1">
                      <span className="label-text-alt text-base">توضیحات پروژه را وارد کنید</span>
                      <span className="label-text me-2">{values.header.length}/500</span>
                  </div>
                  <textarea 
                      className="textarea textarea-bordered w-full rounded-2xl" rows={3}
                      value={values.header} onChange={handleChange} name="header"
                  />
                    {errors.header && touched.header  &&<div className="label">
                       <span className="label-text-alt text-red-600 text-base">{errors.header?.toString()}</span>
                    </div>}             
             
            </div>
            <div className='mb-5'>
                  <div className="label my-2">
                      <span className="label-text-alt text-base">تصاویر پروژه را انتخاب و وارد کنید</span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 justify-start gap-5 pb-5">
                    <input type="file" accept="image/*" className='hidden' onChange={handleImage} ref={imgRef}/>
                    {images?.map((image:ImageItem,idx:number)=>(
                      
                    <div className='relative' key={idx}>
                    <img src={image.img} alt="" className='w-[150px] h-full rounded-xl' />
                        <button
                          type='button'
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-75 text-white text-xl font-bold py-2 px-4 rounded-xl"
                          onClick={DeleteImage(image.id)}
                        >
                        <FaTrash className='text-xl'/>
                                 حذف 
                        </button>
                    </div>))}
                    <button 
                      className="dashed-card-gray p-14 hover:bg-blue-50" 
                      onClick={handleOpenImage}
                      type="button"
                    >
                          <FaPlus className='text-2xl text-gray-700'/>
                    </button>
                  </div>
            </div>
            <div className="mb-8">
                <div className="label mb-1">
                      <span className="label-text-alt text-base">تکنولوژی‌های استفاده را اضافه کنید</span>
                  </div>
                <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                  <input type="text" className="grow" />
                  <button className='btn bg-green-300  btn-sm'>
                    <FaPlus/>
                    افزودن
                  </button>
                </label>
                     
            </div>
            <div className="md:flex justify-between items-center mb-5">
                <div className="form-control">
                  <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox  border-blue-500 [--chkbg:theme(colors.blue.500)] checked:border-blue-500" 
                      />
                      <span className="label-text mx-3 text-lg">این پروژه قابل مشاهد باشد</span>
                  </label>
                  
                </div>
                <button className='btn-blue md:w-80 rounded-2xl text-lg font-semibold'>
                  <FaCheck/>
                    ایجاد پروژه
                  </button>
            </div>
            </form>)}
            </Formik>
          </div>
        </div>
    </div>
  )
}
