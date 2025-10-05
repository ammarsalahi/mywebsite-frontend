
import { useEffect, useState } from 'react'
import { Api ,showImage} from '../api/Index';
import { ABOUT_ME } from '../api/Endpoints';
import { Link, useNavigate } from 'react-router-dom';
import { FaTelegram,FaLinkedin ,FaInstagram,FaGithub} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { FaTrash } from "react-icons/fa6";
import Footer from '../global/Footer';
import { langSelector, tokenSelector } from '../states/Selectors';
import { useRecoilValue } from 'recoil'
import { MdEmail } from 'react-icons/md';
import { Spin } from 'antd';
import { BiPencil } from 'react-icons/bi';
import { Skill, Social, UserAbout } from '../types';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

export default function AboutShow() {
  const [about,setAbout]=useState<UserAbout>();
  const [isLoad,setisLoad]=useState(false);
  // const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
  const token=useRecoilValue(tokenSelector);
	const lang = useRecoilValue(langSelector)
  const {t} = useTranslation()
  
  let navigate=useNavigate()

  const handleGotoEdit=()=>{
      navigate(`/about/edit/${token.user}`);
  }

  const getAbout=async()=>{
    await Api.get(ABOUT_ME).then((res)=>{
      setAbout(res.data)
      setisLoad(true)
    })
  }

  const getIcon=(name:string)=>{
    let result:any;
    switch(name){
      case "telegram":
        result=<FaTelegram fontSize={25}/>
        break
      case "github":
        result=<FaGithub fontSize={25}/>
        break
      case "linkedin":
        result=<FaLinkedin fontSize={25}/>
        break
      case "instagram":
        result=<FaInstagram fontSize={25}/>
        break
      case "email":
        result=<MdEmail fontSize={25}/>
        break
      case "gmail":
        result=<SiGmail fontSize={25}/>
        break
      default:
        result= <TbWorldWww fontSize={25}/>
        break			
    }
    return result
  }

  useEffect(() => {
        getAbout()
    // setpageLoad(true)
  }, [])

  const leftVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 }
  }

  const rightVariant = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 }
  }
  
  return (
  <div>
    {isLoad && about != undefined ?
    <>
    <div className="paddingtop-chat ">
        <div className={`about py-5`} >
          {/* Profile header */}
          <div className="flex justify-center py-5">
            <div className="text-center">
              
             <div className="relative flex justify-center items-center w-[270px] h-[270px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                }}
                className="absolute w-[250px] h-[250px]"
              >
                <img
                  src={showImage(about.user_img)}
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>

              <motion.svg
                className="absolute w-full h-full"
                fill="transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.circle
                  cx="253"
                  cy="253"
                  r="250"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ strokeDasharray: "24 10 0 0" }}
                  animate={{
                    strokeDasharray: [
                      "15 120 25 25",
                      "16 25 92 72",
                      "4 250 22 22",
                    ],
                    rotate: [120, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.svg>
            </div>

              <p className='text-3xl font-bold py-4'>{about?.fullname}</p>

              {token?.access.length>0 && (
                <div className='flex justify-center gap-5 pb-4'>
                  <button className='btn btn-outline btn-circle' onClick={handleGotoEdit}>
                    <BiPencil className='text-xl'/>
                  </button>
                  <button className='btn btn-outline btn-error btn-circle'>
                    <FaTrash className='text-lg'/>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* About */}
            <motion.div 
              className="chat chat-start"
              variants={leftVariant}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6 }}
            >
              <div className="chat-bubble chat-bubble-primary p-3">{t('aboutdes')}</div>
            </motion.div>
            <motion.div 
              className="chat chat-end"
              variants={rightVariant}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 0.3 }}
            >
              <div className="chat-bubble p-5 max-w-sm md:max-w-md">{lang=="fa"?about.description:about.english_description}</div>
            </motion.div>

            {/* Skills */}
           {about.skills.length>0 &&  <motion.div className="chat chat-start"
              variants={leftVariant}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 0.6 }}
            >
              <div className="chat-bubble chat-bubble-primary">{t('aboutski')}</div>
            </motion.div>}
            {about.skills.length>0 && <div>

            {about.skills.map((item:Skill,idx:number)=>(
                  <motion.div className="chat chat-end"
                      variants={rightVariant}
                      initial="hidden"
                      animate="visible"
                      transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 0.9 }}
                      key={idx}
                    >
                      <div className="chat-bubble flex flex-wrap gap-2">
                          {item.name}
                      </div>
                    </motion.div>
            ))}
            </div>}
            

            {/* University */}
            <motion.div className="chat chat-start"
              variants={leftVariant}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 1.2 }}
            >
              <div className="chat-bubble chat-bubble-primary">{t('aboutuni')}</div>
            </motion.div>
            <motion.div className="chat chat-end"
              variants={rightVariant}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 1.5 }}
            >
              <div className="chat-bubble">
                <Link 
                  to={`${about.university_web}`} 
                  className='underline text-blue-700'
                >
                  {lang=="fa"?about.university_name:about.english_university_name}
                </Link>
              </div>
            </motion.div>

            {/* Socials */}
            {about.socials.length>0 && <motion.div className="chat chat-start"
              variants={leftVariant}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 1.8 }}
            >
              <div className="chat-bubble chat-bubble-primary">{t('aboutso')}</div>
            </motion.div>}
            {about.socials.length>0 && <div className='space-y-2'>

            {about.socials?.map((item:Social,idx:number)=>(
                  <motion.div className="chat chat-end"
                      variants={rightVariant}
                      initial="hidden"
                      animate="visible"
                      transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6, delay: 0.9 }}
                      key={idx}
                    >
                      <div className="chat-bubble  " >
                        <Link className="flex flex-wrap gap-2" to={`${item.link}`}>
                               {item.name} {getIcon(item.name)}
                        </Link>
                      </div>
                    </motion.div>
            ))}
            </div>}
            
          </div>
        </div>
    </div>
    <Footer/>
    </>
      :
      <div className="h-screen w-screen grid place-items-center">
        <Spin size='large'/>
      </div>
    }
    </div>
  )
}
