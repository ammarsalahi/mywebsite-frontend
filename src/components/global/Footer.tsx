import React,{useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaTelegram,FaInstagram ,FaLinkedin,FaGithub} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Footer() {
  const location=useLocation()

  return (
    <div className={location.pathname=='/'?'bg-blue-500  w-full text-white':'bg-gray-50 border-t w-full'}>
      <div className="py-5">
      	<div className="footer-category">
      	  <div className="footer-cols">
      	     <p className="text-2xl">پست‌ها</p>
      	     <div className="p-5">
      	     <ul className="footer-list text-center">
      	       <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
      	    	   <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
  				 <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
      	          <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
      	     </ul>
      	     </div>
      	  </div>
 		<div className="footer-cols">
      	     <p className="text-2xl">پروژه‌ها</p>
      	     <div className="p-5">
      	      <ul className="footer-list text-center">
      	       <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
      	    	   <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
  				 <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>
      	          <li className="text-md py-1 hover:border-b ">
               		<Link to="/">
      	       			دسته بندی
      	        	</Link>
      	       </li>

      	     </ul>
      	     </div>
      	  </div>
      	</div>
      <div className="py-5">
        <p className="text-2xl text-center py-7">میتونی منو اینجاها پیدا کنی!</p>
        <div className={location.pathname=="/"?"flex justify-center gap-5 text-white":"flex justify-center gap-5"}>
          <Link to="/">
             <FaTelegram fontSize={40}/>
          </Link>
          <Link to="/">
              <FaInstagram fontSize={40}/>
          </Link>
          	<Link to="/">
          	 <FaLinkedin fontSize={40}/>
          	</Link>
             <Link to="/">
                <FaGithub fontSize={40}/>
          </Link>
          <Link to="/">
            <MdEmail fontSize={40}/>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
