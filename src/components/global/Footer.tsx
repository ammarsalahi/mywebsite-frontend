import React,{useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaTelegram,FaInstagram ,FaLinkedin,FaGithub} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Api } from '../api/Index';
import { ABOUT_ME, FOOTER } from '../api/Endpoints';
import { TbWorldWww } from 'react-icons/tb';
export default function Footer() {
  const location=useLocation()
  const [categories,setCategories]=useState<any>([])
  const [teches,setTeches]=useState<any>([]);
  const [socials,setSocials]=useState<any>([]);
   const getData=async()=>{
	 await Api.get(FOOTER).then((res)=>{
		setCategories(res.data.categories);
		setTeches(res.data.teches)
	 });

   }
   const getAbout=async()=>{
    await Api.get(ABOUT_ME).then((res)=>{
      setSocials(res.data.socials)
    })
  }
  const getIcon=(name:string)=>{
	if(name=='telegram'){
	   return (
		 <FaTelegram fontSize={45} color={'#30b3f0'} className="shadow-xl rounded-full"/>
	   )
	}else if(name=='github'){
	   return (
	   <FaGithub fontSize={40} color={'black'} className="shadow-xl rounded-full"/>
	   )
	}
	else if(name=='linkedin'){
		  return (
		   <FaLinkedin fontSize={40} color={'black'} className="shadow-xl rounded-full"/>
		 )
	}else if(name=='instagram'){
		  return (
	   <FaInstagram fontSize={40} color={'purple'} className="shadow-xl"/>
	   )
	}
	else if(name=='email' || name=='gmail'){
		  return (
	   <MdEmail fontSize={40} color={'#000'} className="shadow-xl rounded-full"/>
	   )
	}
	else{
		  return (
		   <TbWorldWww fontSize={45} color={'#000'} className="shadow-xl rounded-full"/>
		   )
	}
   }
   useEffect(()=>{
     getData();
	if(location.pathname!=='/about'){
	 	getAbout()
	}
   },[location.pathname])
  return (
    <div className={location.pathname=='/'?'bg-blue-500  w-full text-white':'bg-gray-50 border-t w-full'}>
      <div className="py-5">
      	<div className="footer-category">
      	  <div className="footer-cols">
			{categories.length}
      	     <p className="text-2xl">پست‌ها</p>
      	     <div className="p-5">
      	     <ul className="footer-list text-center">
				{categories?.map((item:any,idx:number)=>(
					<li className="text-md py-1 hover:border-b" key={idx}>
						<Link to={`/categories/${item.name}`}>{item.name}</Link>
					</li>
				))}
      	    
      	     </ul>
      	     </div>
      	  </div>
 		<div className="footer-cols">
			{teches.length &&
			  <>
      	     <p className="text-2xl">پروژه‌ها</p>
      	     <div className="p-5">
      	      <ul className="footer-list text-center">
				{teches?.map((item:any,idx:number)=>(
					<li className="text-md py-1 hover:border-b" key={idx}>
						<Link to={`/teches/${item.name}`}>{item.name}</Link>
					</li>
				))}

      	     </ul>
      	     </div>
			 </>}
      	  </div>
      	</div>
      {socials.length>0 && <div className="py-5">
        <p className="text-2xl text-center py-7">میتونی منو اینجاها پیدا کنی!</p>
        <div className={location.pathname=="/"?"flex justify-center gap-5 text-white":"flex justify-center gap-5"}>
         {socials?.map((item:any,idx:number)=>(
			<div key={idx} onClick={()=>window.open(item.link, '_self')}>
            	{getIcon(item.name)}
        	</div>
		 ))}
        </div>
        </div>}
      </div>
    </div>
  )
}
