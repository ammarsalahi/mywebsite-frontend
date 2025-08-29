
import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import logoblack from "../../assets/logo-dark.png";
import logolight from "../../assets/logo-light.png";
import { PiNewspaperFill } from "react-icons/pi";
import { FaGithub, FaHammer, FaHandshake, FaTelegram } from "react-icons/fa6";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Api } from "../api/Index";
import { ABOUT_ME, ABOUTS_ID, FOOTER } from "../api/Endpoints";
import { useRecoilValue } from "recoil";
import { langSelector, themeSelector, tokenSelector } from "../states/Selectors";
import { MdEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { Category, Social, UserAbout } from "../types";

const Footer = () => {
    const { t } = useTranslation();
	const location=useLocation()
	const [categories,setCategories]=useState<Category[]>([]);
	const [socials,setSocials]=useState<Social[]>([]);
	const theme=useRecoilValue(themeSelector)
	const lang = useRecoilValue(langSelector)
	const [about,setAbout] = useState<UserAbout|null>(null);

	const menusFa = [
		{
		  url: "/posts",
		  icon: <PiNewspaperFill fontSize={22} />,
		},
		{
		  url: "/projects",
		  icon: <FaHammer fontSize={22} />,
		},
		{
		  url: "/about",
		  icon: <BsEmojiSunglassesFill fontSize={22} />,
		},
		{
		  url: "/collaboration",
		  icon: <FaHandshake fontSize={22} />,
		},
    ];
   
	const getData=async()=>{
	 	await Api.get(FOOTER).then((res)=>{
		setCategories(res.data.categories);
	 	});

   	}

	const getAbout=async()=>{
		await Api.get(ABOUT_ME).then((res)=>{
		  setSocials(res.data.socials);
		  setAbout(res.data)
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
		getData()
		getAbout()
	},[])
  return (
    <footer className={`${theme=="light"?
      	location.pathname=='/'?'bg-blue-600  w-full text-white':'border-t w-full'
      	:
       'bg-gray-900  w-full text-white border-t border-gray-700'} pt-12 pb-20 md:pb-3 px-6`}
	   >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8" dir={t("dir")}>
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">
			{location.pathname=="/"?
			<img src={logolight} alt="" className="w-[200px]" />
			:
			<img src={theme=="dark"?logolight:logoblack} alt="" className="w-[200px]" />
			}
		  </h2>
          <p className="text-sm leading-relaxed">
			{lang=="fa" ? about?.description:about?.english_description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">صفحات</h3>
          <ul className="space-y-4 text-sm">
			{menusFa.map((item: any, idx: number) => (
					  <li className={`${location.pathname=="/"?(theme=="dark"?"hover:text-blue-600":""):"hover:text-blue-600"}`} key={idx} dir={t("dir")}>
						<Link to={item.url} className="flex items-center gap-1">
						  {item.icon}
						  {t(`menu${idx + 1}`)}
						</Link>
					  </li>
					))}
          </ul>
        </div>

        {/* Others */}
        {categories.length>0?
		<div>
         
		  <h3 className="text-lg font-semibold mb-4">دسته‌بندی‌ها</h3>
          	
			<ul className="space-y-2 text-sm">
				{categories?.slice(0,7).map((item:any,idx:number)=>(
					<li className={`${location.pathname=="/"?(theme=="dark"?"hover:text-blue-600":""):"hover:text-blue-600"}`} key={idx}>
						<Link to={`/categories/${item.english_name}`}>{item.name}</Link>
					</li>
				))}
       	    
          </ul>
        </div>:
		<div></div>}

        {/* Social Media */}
        {socials.length>0 && <div>
          <h3 className=" font-semibold mb-4">شبکه های اجتماعی</h3>
          <div className="flex justify-start gap-x-4 text-xl">
			{socials.map((item:any,idx:number)=>(
				<Link 
					to={item.link} key={idx} 
					className={`${location.pathname=="/"?(theme=="dark"?"hover:text-blue-600":""):"hover:text-blue-600"}`}>
				  {getIcon(item.name)}
				</Link>
			))}

          </div>
        </div>}
      </div>
	  <div className="flex justify-center items-center pt-8">
		<p>2025 &copy;</p>
	  </div>
    </footer>
  );
};

export default Footer;
