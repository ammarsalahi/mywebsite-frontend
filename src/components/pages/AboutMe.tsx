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
import Footer from '../global/Footer'
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
        <FaTelegram fontSize={50} color={'#30b3f0'} className="shadow-xl rounded-full"/>
      )
   }else if(name=='github'){
      return (
      <FaGithub fontSize={50} color={'black'} className="shadow-xl rounded-full"/>
      )
   }
   else if(name=='linkedin'){
         return (
          <FaLinkedin fontSize={50} color={'black'} className="shadow-xl rounded-full"/>
        )
   }else if(name=='instagram'){
         return (
      <FaInstagramSquare fontSize={50} color={'purple'} className="shadow-xl"/>
      )
   }
   else if(name=='email' || name=='gmail'){
         return (
      <SiGmail fontSize={50} color={'#000'} className="shadow-xl rounded-full"/>
      )
   }
   else{
         return (
          <TbWorldWww fontSize={50} color={'#000'} className="shadow-xl rounded-full"/>
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
    <div className='paddingtop ps-20'>
        <div className="about">
          <div className=" md:grid lg:grid grid-cols-3 h-full">
              <div className='items-center pt-10'>
                 <img src={showImage(about?.user_img)} className='rounded-full border-2 border-blue-500 shadow-2xl' width={300} alt="" />
                 <p className='text-5xl px-5  pt-6'>{about?.fullname}</p>
              </div>
              <div className="col-span-2 text-start">
                 <p className='text-2xl text-gray-700'>توضیح کوتاه درباره من</p>
                  <p className='py-5  text-md'>{about.description}</p>

                  <div className="flex gap-2 items-center">
                    <FaComputer fontSize={30} color='gray' />
                    <p className='text-2xl text-gray-500'>مهارت و تخصص</p>
                  </div>
                 <p className='text-2xl text-gray-700 pb-10 pt-5' > {about.skill}</p>
                  <p className='text-lg'></p>
                <div className="flex items-center gap-2">
                  <FaUniversity fontSize={30} color='gray'/>
                  <p className='text-2xl text-gray-700'>دانشگاه</p>
                </div>
                <div className="flex gap-6 pt-5 pb-10">
                  <p className='text-lg'>نام دانشگاه: {about.university_name}</p>
                  <div className="flex gap-3 items-center">
                  <p className='text-lg'>سایت دانشگاه: </p>
                  <Link to={about.university_web} dir='ltr'>{about.university_web}</Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaUsers fontSize={30} color='gray'/>
                  <p className='text-2xl text-gray-700'>راه‌های ارتباطی</p>
                  </div>
                <div className="flex gap-5 py-5">
                 {about.socials?.map((item:any,idx:number)=>(
                    <Link to={item.link} key={idx}>
                        <div>
                            {getIcon(item.name)}
                        </div>
                       {/* <Button size="large" type="text" icon={<PiTelegramLogo fontSize={30} color='white'/>} className='p-4 rounded-full bg-blue-600' /> */}
                    </Link>
                 ))}
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
