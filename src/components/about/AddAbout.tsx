import { Formik } from 'formik';
import React, { useState } from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs';
import { FaCheck ,FaPlus} from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import { Api } from '../api/Index';
import { ABOUTS, SOCIALS } from '../api/Endpoints';
import { AuthConfigHeader } from '../api/Configs';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';
import { message } from 'antd';


interface SocialItem{
  id:number;
  name:string;
  url:string;
}
interface FormikError{
  description?:string;
  skill?:string;
  uni_name?:string;
  uni_site?:string;
}
interface aboutProps{
    theme:string;
}
export default function AddAbout(props:aboutProps) {

  const token=useRecoilValue(tokenSelector)
  const [social,setSocial]=useState({
    name:"",
    url:""
  })
  const [socials,setSocials]=useState<SocialItem[]|[]>([]);

  const handleSocialChange=(valueName:string)=>(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSocial({...social,[valueName]:e.target.value});
  }
  message.config({
    top: document.documentElement.clientHeight - 100,
  });

    const addSocial = (newSocial: SocialItem) => {
        setSocials((prevSocials) => {
            if (prevSocials === null) {
                return [newSocial];
            }
            const exists = prevSocials.some((key) => key.id === newSocial.id);
            if (exists) {
                return prevSocials;
            }
            return [...prevSocials, newSocial];
        });
    };

    const deleteSocial = (SocialId: number) => {
      setSocials((prevSocials) => {
        if (prevSocials === null) {
            return prevSocials; // No keys to delete
        }
        // Filter out the key with the matching id
        return prevSocials.filter((social) => social.id !== SocialId);
    });
    };
  const handleAddSocial=()=>{
    const formdata=new FormData();
    formdata.append("name",social.name);
    formdata.append("url",social.url)
    formdata.append("status","TO ADD");
    Api.post(SOCIALS,formdata).then((res)=>{
        addSocial(res.data)
    }).catch((err)=>{
      console.log(err)
      message.error("متاسفانه مشکلی پیش آمده!")

    })
  }
  

  return (
    <div>
        <div className={props.theme=="dark"?"card-dark":"card-light"}>
          <div className="card-body py-10 px-20">
            <Formik
             initialValues={{
                    description:"",
                    skill:"",
                    uni_name:"",
                    uni_site:""
             }}
             validate={(values)=>{
                const errors:FormikError={}
                if(!values.description){
                  errors.description="این فیلد نمی‌تواند خالی باشد"
                }
                if(!values.skill){
                  errors.skill="این فیلد نمی‌تواند خالی باشد"
                }
                if(!values.uni_name){
                  errors.uni_site="این فیلد نمی‌تواند خالی باشد"
                }
                if(!values.uni_site){
                  errors.uni_site="این فیلد نمی‌تواند خالی باشد"
                }
                return errors
             }}
             onSubmit={(values)=>{
                  const formdata=new FormData();
                  formdata.append("description",values.description);
                  formdata.append("skill",values.skill);
                  formdata.append("university_name",values.uni_name);
                  formdata.append("university_site",values.uni_site)
                  socials.forEach((social:SocialItem)=>{
                    formdata.append("socials",String(social.id))
                  })
                Api.post(ABOUTS,formdata,{
                  headers:AuthConfigHeader(token.access)
                }).then((res)=>{
                  message.success("با موفقیت ساخته شد")
                }).catch((err)=>{
                  console.log(err)
                  message.error("متاسفانه مشکلی پیش آمده!")

                })
             }}
            >
            {({values,handleSubmit,handleChange,errors})=>(
                <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                                <div className="flex gap-2">
                                <BsEmojiSunglassesFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">ساخت درباره‌ی من</p>
                                </div>
                            
                        </div>
                    <div>
                      <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">توضیحات را وارد کنید</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered w-full rounded-2xl" rows={3}
                            value={values.description} onChange={handleChange}
                        />
                        {errors.description  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.description?.toString()}</span>
                        </div>}
                                                                
                        </div>
                        <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">مهارت را وارد کنید</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.skill} onChange={handleChange}
                        />
                        {errors.skill  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.skill?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">نام دانشگاه را وارد کنید</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_name} onChange={handleChange}
                        />
                        {errors.uni_name  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_name?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">سایت دانشگاه را وارد کنید</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_site} onChange={handleChange}
                        />
                        {errors.uni_site  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_site?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className="mb-4">
                      <div className="label mb-1">
                            <span className="label-text-alt text-base"> حساب‌های اجتماعی را وارد کنید</span>
                        </div>
                        <div className="flex gap-0 w-full">
                          <input 
                            value={social.name} onChange={handleSocialChange('name')}
                            type="text" placeholder='نام'
                            className="input input-bordered rounded-s-2xl w-52 rounded-e-none" 
                          />
                          <input 
                            value={social.url} onChange={handleSocialChange('url')}
                            type="url" placeholder='لینک' 
                            className="input input-bordered rounded-none w-full" 
                          />
                          <button 
                            className="btn-blue w-40 rounded-s-none rounded-e-2xl font-semibold"
                            type='button'
                            disabled={social.name!=""&&social.url!=""}
                            onClick={handleAddSocial}
                          >
                            <FaPlus/>
                            افزودن
                          </button>

                        </div>
                        <div className="pt-7 px-4 flex flex-wrap gap-4">
                          <div className='py-1 px-4 bg-blue-500 text-white rounded-full cursor-pointer flex items-center gap-2'>
                            <button 
                              className='btn btn-ghost btn-sm text-xl'
                              type="button"

                            >
                              <IoClose/>
                            </button>
                            <p>نام حساب</p>
                          </div>
                         
                        </div>
                      </div>


                        <button 
                            className='btn-blue md:w-80 rounded-2xl text-lg font-semibold mt-4'
                            type='submit'
                        >
                          <FaCheck/>
                          ایجاد
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
