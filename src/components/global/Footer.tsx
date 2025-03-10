import React,{useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaTelegram,FaInstagram ,FaLinkedin,FaGithub} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Api } from '../api/Index';
import { ABOUTS_ID, FOOTER } from '../api/Endpoints';
import { TbWorldWww } from 'react-icons/tb';
import { useRecoilValue } from 'recoil'
import { themeSelector, tokenSelector } from '../states/Selectors';
import { SiGmail } from 'react-icons/si';
import logoWhite from '../../assets/icon-light.png'
import logoBlue from '../../assets/icon-blue2.png'
import {motion} from 'framer-motion'


export default function Footer() {
  const location=useLocation()
  const [categories,setCategories]=useState<any>([])
  const [teches,setTeches]=useState<any>([]);
  const [socials,setSocials]=useState<any>([]);
  const theme=useRecoilValue(themeSelector)
  const token=useRecoilValue(tokenSelector)
   const getData=async()=>{
	 await Api.get(FOOTER).then((res)=>{
		setCategories(res.data.categories);
		setTeches(res.data.teches)
	 });

   }
   const getAbout=async()=>{
    await Api.get(ABOUTS_ID(token.user)).then((res)=>{
      setSocials(res.data.socials)
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
   useEffect(()=>{
     getData();
	if(location.pathname!=='/about'){
	 	getAbout()
	}
   },[location.pathname])
  return (
    <div className={
      theme=="light"?
      location.pathname=='/'?'bg-blue-600  w-full text-white':'border-t w-full'
      :
       'bg-gray-900  w-full text-white border-t border-gray-700'}>
      <div className="py-3">
      	<div className="footer-category">
		  <div className="footer-cols flex justify-center">
            <div className="relative px-20 py-4">
				<div>
					{/* <motion.img
						src={theme=="light"&&location.pathname!=="/"?logoBlue:logoWhite}
						className="h-32 mb-5"
						initial={{ scale: 1 }}
						animate={{ rotate: 360 }}
						transition={{
							type: "spring",
							stiffness: 110,
							damping: 40,
							repeat:Infinity,
							repeatType:"reverse"
						}}
					/> */}
					<img src={theme=="light"&&location.pathname!=="/"?logoBlue:logoWhite} className='h-36 mb-5'/>
				</div>
				<div className=' text-center'>
					<span className='text-base font-semibold'>&copy; 2024</span>
				</div>
			</div>
		  </div>
      	  <div className="footer-cols lg:col-span-2 lg:px-5 py-3">
			{categories.length>0&&
			<>
      	     <div className="p-2 pt-10">
      	     <ul className="footer-list text-center">
				{categories?.map((item:any,idx:number)=>(
					<li className="text-lg font-semibold py-3" key={idx}>
						<Link to={`/categories/${item.english_name}`}>{item.name}</Link>
					</li>
				))}
      	    
      	     </ul>
      	     </div>
      	     </>}
      	  </div>
      	</div>
	
      </div>
    </div>
  )
}
