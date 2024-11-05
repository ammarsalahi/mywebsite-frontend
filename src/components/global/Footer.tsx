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
import logowhite from '../../assets/logo-light.png'
import logodark from '../../assets/logo-blue.png'

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
      	  <div className="footer-cols">
			{categories.length>0&&
			<>
      	     <p className="text-2xl font-semibold">پست‌ها</p>
      	     <div className="p-2 pt-10">
      	     <ul className="footer-list text-center">
				{categories?.map((item:any,idx:number)=>(
					<li className="text-md py-3" key={idx}>
						<Link to={`/categories/${item.name}`}>{item.name}</Link>
					</li>
				))}
      	    
      	     </ul>
      	     </div>
      	     </>}
      	  </div>
 		<div className="footer-cols">
			{teches.length >0 &&
			  <>
      	     <p className="text-2xl font-semibold">پروژه‌ها</p>
      	     <div className="p-5 pt-10">
      	      <ul className="footer-list text-center">
				{teches?.map((item:any,idx:number)=>(
					<li className="text-md py-3 hover:border-b" key={idx}>
						<Link to={`/teches/${item.name}`}>{item.name}</Link>
					</li>
				))}

      	     </ul>
      	     </div>
			 </>}
      	  </div>
      	</div>
		<div className="pt-10 pb-2 px-10 lg:px-32 flex justify-between items-center">
			<div>
				<img src={theme=="dark"?logowhite:logodark} className='w-[200px]'/>
			</div>
			<div>
				<span className='text-base'>&copy; 2024</span>
			</div>
      {socials.length>0 && <div>
        <div className={location.pathname=="/"?"flex justify-center gap-5 text-white":"flex justify-center gap-5"}>
         {socials?.map((item:any,idx:number)=>(
			<div className="cursor-pointer" key={idx} onClick={()=>window.open(item.link, '_blank')}>
            	{getIcon(item.name)}
        	</div>
		 ))}
        </div>
        </div>}
		</div>
      </div>
    </div>
  )
}
