import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs';
import { FaCheck ,FaPlus} from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import { ABOUTS_ID, SKILLS, SKILLS_ID } from '../api/Endpoints';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';
import { Api } from '../api/Index';
import { Descriptions, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { AuthConfigHeader } from '../api/Configs';
import { useNavigate } from 'react-router-dom';
import { Skill, Social, UserAbout } from '../types';


interface aboutProps{
    theme:string;
    id:number
}

interface FormikError{
  description?:string;
  description_en?:string;
  skill?:string;
  uni_name?:string;
  uni_name_en?:string;
  uni_site?:string;
}

export default function EditAbout(props:aboutProps) {
  let navigate = useNavigate();

  const [about,setAbout]=useState<UserAbout|null>(null);
  const [isLoad,setisLoad]=useState(false);
  const token=useRecoilValue(tokenSelector) 
  const [socials,setSocials]=useState<Social[]>([]);
  const [skills,setSkills]=useState<Skill[]>([]);

  const {t} = useTranslation()


  message.config({
    top: document.documentElement.clientHeight - 100,
  });


  const getAbout=()=>{
    Api.get(ABOUTS_ID(props.id)).then((res)=>{
      setAbout(res.data)
      setSocials(res.data.socials);
      setSkills(res.data.skills)
      setisLoad(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
    useEffect(() => {
      getAbout()
    }, [])
    

    const addSkill = (newSkill: Social) => {
      setSkills((prevSkills) => {
          if (prevSkills === null) {
              return [newSkill];
          }
          const exists = prevSkills.some((key) => key.id === newSkill.id);
          if (exists) {
              return prevSkills;
          }
          return [...prevSkills, newSkill];
      });
  };
  
  const deleteSkill = (SocialId: number) => {
      setSocials((prevSocials) => {
        if (prevSocials === null) {
            return prevSocials; // No keys to delete
        }
        // Filter out the key with the matching id
        return prevSocials.filter((social) => social.id !== SocialId);
    });
  };
  
  const handleAddSkill=(name:string)=>()=>{
    const formdata=new FormData();
    formdata.append("name",name);
    formdata.append("status",`TO ADD ${token.user}`);
    Api.post(SKILLS,formdata).then((res)=>{
        addSkill(res.data)
        // setSkillName("")
    }).catch((err)=>{
      console.log(err)
      message.error(t('notaccepted'))
  
    })
  }
  
  const handleDeleteSkill=(id:number)=>()=>{
    Api.delete(SKILLS_ID(id)).then((res)=>{
       deleteSkill(id)
         message.info(t('removed'))
    }).catch((err)=>{
      console.log(err)
      message.error(t('noaccept'))
  
    })
  }
  return (
    <div  dir={t('dir')}>
      {isLoad ?
        <div className={props.theme=="dark"?"card-dark":"card-light"}>
          <div className="md:card-body md:py-10 md:px-20">
            <Formik
             initialValues={{
                    description:about?.description||"",
                    description_en:about?.english_description||"",
                    skill:about?.skills||"",
                    uni_name:about?.university_name||"",
                    uni_name_en:about?.english_university_name||"",
                    uni_site:about?.university_web||""
             }}
             validate={(values)=>{
              const errors:FormikError={}
              if(!values.description){
                errors.description=t('notempty')
              }
              if(!values.description_en){
                errors.description_en=t('notempty')
              }
              if(!values.skill){
                errors.skill=t('notempty')
              }
              if(!values.uni_name){
                errors.uni_name=t('notempty')
              }
              if(!values.uni_name_en){
                errors.uni_name_en=t('notempty')
              }
              if(!values.uni_site){
                errors.uni_site=t('notempty')
              }
              return errors
           }}
             onSubmit={(values)=>{
                  const formdata=new FormData();
                  formdata.append("description",values.description);
                  formdata.append("english_description",values.description_en);
                  formdata.append("university_name",values.uni_name);
                  formdata.append("english_university_name",values.uni_name_en);
                  formdata.append("university_site",values.uni_site)
                  socials?.forEach((social:Social)=>{
                    formdata.append("socials",String(social.id))
                  })
                  skills?.forEach((skill:Skill)=>{
                      formdata.append("skills",String(skill.id))
                  })
                Api.patch(ABOUTS_ID(props.id),formdata,{
                  headers:AuthConfigHeader(token.access)
                }).then((res)=>{
                  message.success(t('accepted'))
                  navigate("/about")
                }).catch((err)=>{
                  console.log(err)
                  message.error(t('notaccepted'))

                })
             }}
            >
            {({values,handleSubmit,handleChange,errors})=>(
                <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                                <div className="flex gap-2">
                                <BsEmojiSunglassesFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">{t('editabout')}</p>
                                </div>
                            
                        </div>
                    <div className='space-y-5'>
                      <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('aboutdec')}</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered w-full rounded-2xl" rows={3}
                            value={values.description} onChange={handleChange} name="description"
                        />
                        {errors.description  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.description?.toString()}</span>
                        </div>}
                                                                
                        </div>
                       <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('aboutdecen')}</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered w-full rounded-2xl" rows={3}
                            value={values.description_en} onChange={handleChange} name="description_en"
                        />
                        {errors.description_en  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.description_en?.toString()}</span>
                        </div>}
                                                                
                        </div>                  
                      <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('univ')}</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_name} onChange={handleChange} name="uni_name"
                        />
                        {errors.uni_name  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_name?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('univen')}</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_name_en} onChange={handleChange} name="uni_name_en"
                        />
                        {errors.uni_name_en  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_name_en?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('unisite')}</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_site} onChange={handleChange}
                        />
                        {errors.uni_site  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_site?.toString()}</span>
                        </div>}
                                                                
                      </div>

                      <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('skills')}</span>
                        </div>
                        <label className='input input-bordered w-full rounded-2xl flex items-center gap-1'>
                            <input
                              // value={values.skill} 
                              onChange={handleChange} name="skill"
                              className='grow'
                            />
                            {values.skill.length>0 &&
                              <button 
                                className='btn btn-ghost text-blue-600 rounded-full text-base'
                                type="button" 
                                // onClick={handleAddSkill(values.skills)}
                              >
                                <FaPlus/>
                                {t('add')}
                              </button> 
                            }
                        </label>
                        <div className="pt-3 px-4 flex flex-wrap gap-4">
                        {skills?.map((item:Skill,idx:number)=>(
                              <div key={idx}
                                  className='py-1 px-3 bg-blue-500 text-white rounded-full cursor-pointer flex items-center gap-2'>
                                  <button 
                                    className='btn btn-circle btn-ghost btn-sm text-xl hover:bg-red-500'
                                    type="button"
                                    onClick={handleDeleteSkill(item.id)}
                                  >
                                    <IoClose/>
                                  </button>
                                  <p>{item.name}</p>
                                </div>
                          ))}
                          </div>
                        
                        {errors.skill  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.skill?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div>
                      <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('socials')}</span>
                        </div>
                        <div className="flex gap-0 w-full">
                          <input type="text" className="input input-bordered rounded-s-2xl w-52 rounded-e-none" />
                          <input type="text" className="input input-bordered rounded-none w-full" />
                          <button className="btn-blue w-40 rounded-s-none rounded-e-2xl  font-semibold">
                            <FaPlus/>
                            {t('add')}
                          </button>

                        </div>
                        <div className="pt-7 px-4 flex flex-wrap gap-4">
                          {socials?.map((item:Social,idx:number)=>(
                              <div key={idx}
                                  className='py-1 px-3 bg-blue-500 text-white rounded-full cursor-pointer flex items-center gap-2'>
                                  <button 
                                    className='btn btn-circle btn-ghost btn-sm text-xl hover:bg-red-500'
                                    type="button"
                                  >
                                    <IoClose/>
                                  </button>
                                  <p>{item.name}</p>
                                </div>
                          ))}
                          
                         
                        </div>
                      </div>


                        <button 
                            className='btn-blue md:w-80 rounded-2xl text-lg font-semibold mt-4'
                            type='submit'
                        >
                          <FaCheck/>
                           {t('agree')}
                        </button>
                    </div>
                   
                </form>
            )}
            </Formik>
          </div>
        </div>
      :
        <div className="h-screen w-screen grid place-items-center">
        <Spin size='large'/>
        </div>
      }
    </div>
  )
}
