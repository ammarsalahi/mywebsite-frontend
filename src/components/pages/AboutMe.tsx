import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import userimg from '../../assets/Remove-bg.ai_1717403474388.png'
import { FaUniversity } from "react-icons/fa";
import { Api ,showImage} from '../api/Index';
import { ABOUT_ME, ABOUTS_ID } from '../api/Endpoints';
import { Link } from 'react-router-dom';
import { FaTelegram,FaLinkedin ,FaInstagramSquare,FaGithub} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { FaComputer,FaUsers } from "react-icons/fa6";
import Footer from '../global/Footer';
import { FaUser } from "react-icons/fa6";
import { Spin } from 'antd';

export default function AboutMe() {
  const [about,setAbout]=useState<any>(null);
  const [isLoad,setisLoad]=useState(false);
  const getAbout=async()=>{
    await Api.get(ABOUT_ME).then((res)=>{
      setAbout(res.data)
      setisLoad(true)
    })
  }

  const getIcon=(name:string)=>{
   if(name=='telegram'){
      return (
        <FaTelegram fontSize={45} color={'#30b3f0'} className="shadow-xl rounded-full"/>
      )
   }else if(name=='github'){
      return (
      <FaGithub fontSize={45} color={'black'} className="shadow-xl rounded-full"/>
      )
   }
   else if(name=='linkedin'){
         return (
          <FaLinkedin fontSize={45} color={'black'} className="shadow-xl rounded-full"/>
        )
   }else if(name=='instagram'){
         return (
      <FaInstagramSquare fontSize={45} color={'purple'} className="shadow-xl"/>
      )
   }
   else if(name=='email' || name=='gmail'){
         return (
      <SiGmail fontSize={45} color={'#000'} className="shadow-xl rounded-full"/>
      )
   }
   else{
         return (
          <TbWorldWww fontSize={45} color={'#000'} className="shadow-xl rounded-full"/>
          )
   }
  }
  useEffect(() => {
    getAbout()
  }, [])
  
  return (
  <div>
    {isLoad?
    <>
    <div className="pt-16 pb-5">
        <div className="about py-5">
          <div className="about-grid">
             <div className='flex justify-center ps-2 pt-4'>
             <div>
                 <img src={showImage(about?.user_img)} className='rounded-full border-2 border-blue-500 shadow-2xl' width={300} alt="" />
                 <p className='xs:text-3xl xs:md:sm:text-4xl xs:xl:text-5xl py-5 text-center'>{about?.fullname}</p>
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
                 <p className='text-xl pb-10 pt-5' > {about.skill}</p>
                  <p className='text-lg'></p>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaUniversity fontSize={30}/>
                  <p className='text-xl'>دانشگاه</p>
                </div>
                <div className=" pb-10 pt-5 university-flex">
                  <p className='text-lg pb-3'>نام دانشگاه: {about.university_name}</p>
                  <div className="flex gap-3 items-center pb-3">
                  <p className='text-lg'>سایت دانشگاه: </p>
                  <Link to={about.university_web} dir='ltr'>{about.university_web}</Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <FaUsers fontSize={30}/>
                  <p className='text-xl'>راه‌های ارتباطی</p>
                  </div>
                <div className="flex gap-5 py-5">
                 {about.socials?.map((item:any,idx:number)=>(
                    <div key={idx} onClick={()=>window.open(item.link, '_self')}>
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
