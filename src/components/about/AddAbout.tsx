import { Formik } from 'formik';
import React, { useState } from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs';
import { FaCheck ,FaPlus} from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import { Api } from '../api/Index';
import { ABOUTS, SKILLS, SKILLS_ID, SOCIALS, SOCIALS_ID } from '../api/Endpoints';
import { AuthConfigHeader } from '../api/Configs';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddSocialModal from './AddSocialModal';
import { Skill, Social } from '../types';


interface FormikError{
  description?:string;
  description_en?:string;
  skill?:string;
  uni_name?:string;
  uni_name_en?:string;
  uni_site?:string;
}
interface aboutProps{
    theme:string;
}

export default function AddAbout(props:aboutProps) {
  let navigate = useNavigate();
  let modalElement = document.getElementById('socialmodal') as HTMLDialogElement | null;

  const token=useRecoilValue(tokenSelector)
  const [social,setSocial]=useState({
    name:"",
    url:""
  })
  const [socials,setSocials]=useState<Social[]>([]);

  // const [skillname,setSkillName]=useState("");
  const [skills,setSkills]=useState<Skill[]>([]);

  const {t} = useTranslation()


  const handleSocialChange=(valueName:string)=>(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSocial({...social,[valueName]:e.target.value});
  }
  message.config({
    top: document.documentElement.clientHeight - 100,
  });

    const addSocial = (newSocial: Social) => {
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

  const handleOpenModal=()=>{
    modalElement = document.getElementById('socialmodal') as HTMLDialogElement | null;
    modalElement?.showModal();
  } 
  
  const handleOpenClose=()=>{
    modalElement?.close();
  } 

  const handleAddSocial=()=>{
    const formdata=new FormData();
    formdata.append("name",social.name);
    formdata.append("link",social.url)
    formdata.append("status",`TO ADD ${token.user}`);
    Api.post(SOCIALS,formdata).then((res)=>{
        addSocial(res.data)
        setSocial({name:"",url:""})
    }).catch((err)=>{
      console.log(err)
      message.error(t('notaccepted'))

    })
  }
  
  const handleDeleteSocial=(id:number)=>()=>{
      Api.delete(SOCIALS_ID(id)).then((res)=>{
         deleteSocial(id)
           message.info(t('removed'))
      }).catch((err)=>{
        console.log(err)
        message.error(t('noaccept'))
  
      })
  }

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

const deleteSkill = (SkillId: number) => {
    setSkills((prevSkills) => {
      if (prevSkills === null) {
          return prevSkills; // No keys to delete
      }
      // Filter out the key with the matching id
      return prevSkills.filter((skill) => skill.id !== SkillId);
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
    <div dir={t('dir')}>
        <div className={props.theme=="dark"?"card-dark":"card-light"}>
          <div className="md:card-body md:py-10 md:px-20">
            <Formik
             initialValues={{
                    description:"",
                    description_en:"",
                    skill:"",
                    uni_name:"",
                    uni_name_en:"",
                    uni_site:""
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
                  errors.uni_name=t('notempty')
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
                  skills.forEach((skill:Skill)=>{
                    formdata.append("skills",String(skill.id))
                  })
                Api.post(ABOUTS,formdata,{
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
            {({values,handleSubmit,handleChange,errors,touched})=>(
                <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                                <div className="flex gap-2">
                                <BsEmojiSunglassesFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">{t('createabout')}</p>
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
                        {errors.description && touched.description  &&<div className="label">
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
                        {errors.description_en && touched.description_en  &&<div className="label">
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
                        {errors.uni_name && touched.uni_name &&<div className="label">
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
                        {errors.uni_name_en && touched.uni_name_en &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_name_en?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div >
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('unisite')}</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_site} onChange={handleChange} name="uni_site"
                        />
                        {errors.uni_site && touched.uni_site  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_site?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('skills')}</span>
                        </div>
                        <label className='input input-bordered w-full rounded-2xl flex items-center gap-1'>
                            <input
                              value={values.skill} onChange={handleChange} name="skill"
                              className='grow'
                            />
                            {values.skill.length>0 &&
                              <button 
                                className='btn btn-ghost text-green-600 rounded-full text-base'
                                type="button" onClick={handleAddSkill(values.skill)}
                              >
                                <FaPlus/>
                                {t('add')}
                              </button> 
                            }
                        </label>
                        {skills.length> 0 && <div className="pt-5 px-4 flex flex-wrap gap-4">
                        {skills?.map((item:Skill,idx:number)=>(
                              <div key={idx}
                                  className='py-1 px-3 bg-blue-500 text-white rounded-full cursor-pointer flex items-center gap-4'>
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
                          </div>}
                       
                        {errors.skill && touched.skill &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.skill?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className='hidden md:block'>
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('socials')}</span>
                        </div>
                        <div className="flex gap-0 w-full">
                          <input 
                            value={social.name} onChange={handleSocialChange('name')}
                            type="text" placeholder={t('soname')}
                            className="input input-bordered rounded-s-2xl w-52 rounded-e-none" 
                          />
                          <input 
                            value={social.url} onChange={handleSocialChange('url')}
                            type="url" placeholder={t('liname')} 
                            className="input input-bordered rounded-none w-full text-end" 
                          />
                          <button 
                            className="btn-blue w-40 rounded-s-none rounded-e-2xl font-semibold"
                            type='button'
                            disabled={social.name.length==0 && social.url.length==0}
                            onClick={handleAddSocial}
                          >
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
                                    onClick={handleDeleteSocial(item.id)}
                                  >
                                    <IoClose/>
                                  </button>
                                  <p>{item.name}</p>
                                </div>
                          ))}
                          
                         
                        </div>
                      </div>

                      <div className="md:hidden">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">{t('socials')}</span>
                        </div>
                        <div className="flex justify-center items-center pt-4 px-10">
                            <button 
                              type='button'
                              className='btn btn-outline btn-primary w-full rounded-2xl'
                              onClick={handleOpenModal}
                            >
                               {t('add')}
                            </button>
                        </div>
                      </div>
                      <div className='pt-5'>
                        <button 
                            className='btn-blue w-full md:w-80 rounded-2xl text-lg font-semibold mt-10'
                            type='submit'
                        >
                          <FaCheck/>
                          {t('creates')}
                        </button>
                        </div>
                    </div>
                   
                </form>
            )}
            </Formik>
          </div>
        </div>
        <AddSocialModal  addsocial={addSocial} close={handleOpenClose}/>
        
        {/* <AddEditSocial/> */}
    </div>
  )
}
