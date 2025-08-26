import React, { useRef, useState } from 'react'
import { FaCheck, FaHammer, FaPlus, FaTrash } from 'react-icons/fa6'
import { PiCameraPlusFill } from 'react-icons/pi'
import { Formik } from 'formik'
import bgs from '../../assets/bgs.jpg'
import { Api } from '../api/Index'
import { IMAGES, IMAGES_ID, PROJECTS, TECHNOLOGIES, TECHNOLOGIES_ID } from '../api/Endpoints'
import { AuthConfigHeaderFile, ConfigHeaderFile } from '../api/Configs'
import { useRecoilValue } from 'recoil'
import { tokenSelector } from '../states/Selectors'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Image, Technology } from '../types'

interface formErrors{
  title?:string;
  header?:string;
}




interface projectProps{
  theme:string
}

export default function AddProject(props:projectProps) {

  const [images, setImages] = useState<Image[]|null>(null);
  const [teches,setTeches] = useState<Technology[]|null>(null);
  const [image,setImage]=useState<string|null>(null);
  const [file,setFile] = useState<File|null>(null);

  const imgRef=useRef<HTMLInputElement|null>(null);
  const imgsRef=useRef<HTMLInputElement|null>(null);
  const [techname,setTechname] = useState<string>("");


  const {t} = useTranslation()
  const token = useRecoilValue(tokenSelector);

  let navigate = useNavigate();

  const handleTechname=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setTechname(e.target.value)
  }
  const handleOpenImage=()=>{
        imgRef.current?.click()
  }
  const handleOpenImages=()=>{
    imgsRef.current?.click()
}
  const addImg = (newimg: Image) => {
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
      setFile(selectedFile||null);
      if (selectedFile && selectedFile.type.startsWith('image/')) {
          const filePreview = URL.createObjectURL(selectedFile);
          setImage(filePreview);  
      } else {
          setImage(null);  
      }
   }
    const handleImages=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const selectedFile=e.target.files?.[0]
      
      if (selectedFile){
        const formdata = new FormData()
        formdata.append("img",selectedFile)
        formdata.append("state","to add")

        Api.post(IMAGES,formdata,{headers:ConfigHeaderFile()}).then((res)=>{
            addImg(res.data);
        }).catch(()=>{
          // console.log(err);
          message.error(t('notaccepted'))
        })
      }
   
  }

  const handleDeleteImage=(id:number)=>()=>{
    Api.delete(IMAGES_ID(id)).then(()=>{
        deleteImg(id);
    }).catch(()=>{
      message.error(t('notaccepted'))
  })
  }

  const addTech = (newtech: Technology) => {
    setTeches((prevs) => {
        if (prevs === null) {
            return [newtech];
        }
        const exists = prevs.some((tch) => tch.id === newtech.id);
        if (exists) {
            return prevs;
        }
        return [...prevs, newtech];
    });
};

const deleteTech = (techId: number) => {
setImages((prevs) => {
    if (prevs === null) {
        return prevs; // No keys to delete
    }
    return prevs.filter((tch) => tch.id !== techId);
  });
};

const handleAddTech=()=>{
  Api.post(TECHNOLOGIES,{name:techname}).then((res)=>{
        addTech(res.data);
  }).catch(()=>{
      // console.log(err);
      message.error(t('notaccepted'))
  })
}
const handleDeleteTech=(id:number)=>()=>{
    Api.delete(TECHNOLOGIES_ID(id)).then(()=>{
        deleteTech(id)
    }).catch(()=>{
      // console.log(err);
      message.error(t('notaccepted'))
    })
}
  return (
    <div dir={t('dir')}>
        <div className={props.theme=="dark"?"card-dark":"card-light"}>
          <div className="md:card-body md:py-10 md:px-20">
          <Formik
                initialValues={{
                    title:"",
                    header:"",
                    is_active:false,
                }}
                validate={(values)=>{
                    let errors:formErrors={}
                    if(!values.title){
                        errors.title=t('notempty')
                    }
                    if(!values.header){
                        errors.header=t('notempty')
                    }
                    
                   
                   return errors
                    
                }}
                onSubmit={(values)=>{
                  const formdata=new FormData()
                  formdata.append("title",values.title)
                  formdata.append("text",values.header);
                  formdata.append("is_active",String(values.is_active))
                  if(file){
                    formdata.append("header_image",file)
                  }
                  images?.forEach((img:Image)=>{
                    formdata.append('images',String(img.id))
                  });
                  teches?.forEach((tech:Technology)=>{
                    formdata.append('teches',String(tech.id))
                  });

                  Api.post(PROJECTS,formdata,{headers:AuthConfigHeaderFile(token.access)}).then(()=>{
                      message.success(t('accepted'))
                      navigate("/projects")
                  }).catch((err)=>{
                     console.log(err)
                     console.log(token)
                      message.error(t('notaccepted'))
                  })
                }}
            >
            {({values,handleSubmit,handleChange,errors,touched})=>(
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-10">
                <div className="flex gap-2 items-center">
                <FaHammer className='text-3xl'/>
                <p className="text-2xl text-center font-bold">{t('projectaddtitle')}</p>
                </div>
               
              </div>
            <div className="mb-5">
                    <div className="label mb-1">
                      <span className="label-text-alt text-base">{t('posttitle')}</span>
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
                         <span className="label-text-alt text-base">{t('postimg')}</span>
                      </div>
                      {image? <div className='relative '>
                                <img src={image} alt="" className='h-[250px] w-full rounded-xl' />
                                <button
                                    onClick={handleOpenImage}
                                    type='button'
                                    className="absolute inset-0 flex gap-2 items-center justify-center bg-black bg-opacity-25 hover:bg-opacity-[80%] text-white text-xl font-bold py-2 px-4 rounded-xl"
                                >
                                 <PiCameraPlusFill className='text-2xl'/>
                                  {t('imgbtnch')}
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
                                        {t('imgbtn')}
                                    </button>
                            </div>}
                            {image==null &&<div className="label">
                                    <span className="label-text-alt text-red-600 text-base"></span>
                                </div>}
                            </div>
            <div className="mb-5">
                  <div className="label mb-1">
                      <span className="label-text-alt text-base">{t('projectdesc')}</span>
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
                      <span className="label-text-alt text-base">{t('projimgs')}</span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 justify-start gap-5 pb-5">
                    <input type="file" accept="image/*" className='hidden' onChange={handleImages} ref={imgsRef}/>
                    {images?.map((imgs:Image,idx:number)=>(
                      
                        <div className='relative' key={idx}>
                          <img src={imgs.img} alt="" className='w-[150px] h-full rounded-xl' />
                              <button
                                type='button'
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-75 text-white text-xl font-bold py-2 px-4 rounded-xl"
                                onClick={handleDeleteImage(imgs.id)}
                              >
                              <FaTrash className='text-xl'/>
                               {t('delete')} 
                              </button>
                        </div>
                  ))}
                    <button 
                      className="dashed-card-gray p-14 hover:bg-blue-50" 
                      onClick={handleOpenImages}
                      type="button"
                    >
                          <FaPlus className='text-2xl text-gray-700'/>
                    </button>
                  </div>
            </div>
            <div className="mb-8">
                <div className="label mb-1">
                      <span className="label-text-alt text-base">{t('projtechs')}</span>
                  </div>
                <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                  <input  
                      type="text" className="grow" 
                      value={techname} onChange={handleTechname}
                  />
                  <button 
                    className="btn bg-ghost btn-sm"
                    type="button"
                    onClick={handleAddTech}
                  >
                    <FaPlus/>
                    {t('add')}
                  </button>
                </label>
                <div className='flex flex-wrap gap-3'>
                  {teches?.map((tch:Technology,idx:number)=>(
                        <button 
                          key={idx} type="button"
                          onClick={handleDeleteTech(tch.id)}
                          className='btn bg-blue-600 hover:btn-error hover:text-white btn-sm w-max-xs rounded-full text-white'>
                           # {tch.name}
                        </button>
                  ))}
                </div>
                     
            </div>
            <div className="md:flex justify-between items-center mb-5">
                <div className="form-control">
                  <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox  border-blue-500 [--chkbg:theme(colors.blue.500)] checked:border-blue-500" 
                      />
                      <span className="label-text mx-3 text-lg">{t('projshow')}</span>
                  </label>
                  
                </div>
                <button className='btn-blue w-full mt-5 md:mt-0 md:w-80 rounded-2xl text-lg font-semibold'>
                  <FaCheck/>
                    {t('projcreate')} 
                  </button>
            </div>
            </form>)}
            </Formik>
          </div>
        </div>
    </div>
  )
}
