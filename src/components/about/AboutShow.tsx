import React, { useEffect, useState } from 'react'
import { FaUniversity } from "react-icons/fa";
import { Api ,showImage} from '../api/Index';
import { ABOUTS_ID } from '../api/Endpoints';
import { Link, useNavigate } from 'react-router-dom';
import { FaTelegram,FaLinkedin ,FaInstagram,FaGithub} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { FaComputer,FaTrash,FaUsers } from "react-icons/fa6";
import Footer from '../global/Footer';
import { FaUser } from "react-icons/fa6";
import { pageLoadSelector, themeSelector, tokenSelector } from '../states/Selectors';
import { useRecoilState, useRecoilValue } from 'recoil'
import { MdEmail } from 'react-icons/md';
import { Spin } from 'antd';
import { BiPencil } from 'react-icons/bi';
import { UserAbout } from '../types';



export default function AboutShow() {
  const [about,setAbout]=useState<UserAbout>();
  const [isLoad,setisLoad]=useState(false);
  const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
  const token=useRecoilValue(tokenSelector);
  // const theme=useRecoilValue(themeSelector) 
  
  let navigate=useNavigate()

  const handleGotoEdit=()=>{
      navigate(`/about/edit/${token.user}`);
  }


  const getAbout=async()=>{
    await Api.get(ABOUTS_ID(token.user)).then((res)=>{
      setAbout(res.data)
      setisLoad(true)
    })
  }

  const getIcon=(name:string)=>{
    let result:any;
    switch(name){
      case "telegram":
        result=<FaTelegram fontSize={40}/>
        break
      case "github":
        result=<FaGithub fontSize={40}/>
        break
      case "linkedin":
        result=<FaLinkedin fontSize={40}/>
        break
      case "instagram":
        result=<FaInstagram fontSize={40}/>
        break
      case "email":
        result=<MdEmail fontSize={40}/>
        break
      case "gmail":
        result=<SiGmail fontSize={40}/>
        break
      default:
        result= <TbWorldWww fontSize={40}/>
        break			
    }
  
    return result
     }
  useEffect(() => {
    if(token?.user){
        getAbout()

    }
    setpageLoad(true)
  }, [])
  
  return (
  <div>
    {isLoad && about != undefined ?
    <>
    <div className="paddingtop">
        <div className={`about py-5 `}>
          <div className="about-grid">
                <div className='flex justify-center pt-4'>
                  <div>
                 <img src={showImage(about.user_img)} className='rounded-full border-2 border-blue-500 shadow-2xl' width={300} alt="" />
                 <p className='xs:text-3xl xs:md:sm:text-4xl xs:xl:text-5xl py-5 text-center'>{about?.fullname}</p>

                {token?.access.length>0&& <div className='flex justify-center pb-4 gap-5'>
                <button className='btn-blue-outline btn-circle' onClick={handleGotoEdit}>
                  <BiPencil className='text-3xl'/>
                </button>
                <button className='btn-red-outline btn-circle'>
                  <FaTrash className='text-2xl'/>
                </button>
                </div>}
                </div>
              
              </div>


              <div className="about-cols">
                <div>
               
                  <div className="py-5 rounded-xl">
                      <div className="flex gap-2 text-gray-500">
                        <FaUser fontSize={27}/>
                        <p className='text-xl '>توضیح کوتاه درباره من</p>
                      </div>
                      <p className='py-7  text-md'>{about.description}</p>
                  </div>
                  <div className="flex gap-2 items-center text-gray-500">
                    <FaComputer fontSize={30} />
                    <p className='text-xl'>مهارت و تخصص</p>
                  </div>
                 {/* <p className='text-xl pb-10 pt-5' > {about.skills}</p> */}
                  <p className='text-lg'></p>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaUniversity fontSize={30}/>
                  <p className='text-xl'>دانشگاه</p>
                </div>
                <div className=" pb-10 pt-5 university-flex">
                  <p className='text-lg pb-3'>نام دانشگاه: {about.university_name}</p>
                  <div className="flex gap-3 items-center pb-3">
                  <p className='text-lg'>سایت دانشگاه: </p>
                   {about.university_web && <Link to={about.university_web} dir='ltr'>{about.university_web}</Link>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <FaUsers fontSize={30}/>
                  <p className='text-xl'>راه‌های ارتباطی</p>
                  </div>
                <div className="flex gap-5 py-5">
                 {about.socials?.map((item:any,idx:number)=>(
                    <div key={idx} onClick={()=>window.open(item.link, '_blank')} className='cursor-pointer text-lg text-blue-600'>
                      {getIcon(item.name)}
                    </div>
                 ))}
                </div>
              
                </div>
                
              </div> 
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
