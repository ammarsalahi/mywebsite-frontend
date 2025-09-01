import React, { useEffect, useRef, useState } from 'react'
import VerticalCard from './VerticalCard'
import { PiNewspaperClipping, PiClock, PiShareNetwork } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { showImage } from '../api/Index'
import { useRecoilValue } from 'recoil'
import { langSelector, themeSelector } from '../states/Selectors'
import { BsPen } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { MdOutlineMore } from "react-icons/md";
import { BiBookReader, BiPencil } from "react-icons/bi";
import { FaFire, FaTrash } from 'react-icons/fa6';
import { BiCategory } from "react-icons/bi";
import { useTranslation } from 'react-i18next'
import { FaXTwitter ,FaTelegram,FaDiscord} from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import { Post } from '../types'


interface detailprops{
  post:Post;
  others:Post[];
  reload:()=>void
}
export default function Detail(props:detailprops) {
  const theme=useRecoilValue(themeSelector)
 
 
  const [scrollValue, setScrollValue] = useState(0);
  const {t} = useTranslation();
  const lang=useRecoilValue(langSelector);


  const handlePageScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const newValue = 100 - (currentScroll / maxScroll) * 100;
    setScrollValue(newValue);
  };

  const handleScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setScrollValue(value);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = ((100 - value) / 100) * maxScroll
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  useEffect(() => {
    handlePageScroll();
    window.addEventListener("scroll", handlePageScroll);
    
    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, []);


 
  return (
    <div className='detail-show '>
      <div className="hidden md:block minicol pb-40">
        <div className="ancher-show">

          <ul className="flex flex-col items-center ">
            <li>
              <button className="btn btn-ghost text-2xl">
                <BiPencil fontSize={30} />
              </button>
            </li>
            <li>
              <button className="btn btn-ghost text-2xl">
                <GoTrash />
              </button>
            </li>
            <li>
              <button className="btn btn-ghost text-2xl">
                <MdOutlineMore />
              </button>
            </li>
            <li>
              <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn btn-ghost text-2xl">
                  <PiShareNetwork />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-0 shadow">
                  <li>
                    <div className='flex justify-between'>
                        <button className='btn btn-ghost btn-circle text-2xl'>
                          <IoCopy/>
                        </button>
                        <button className='btn btn-ghost btn-circle text-2xl'>
                          <FaXTwitter/>
                        </button>
                        <button className='btn btn-ghost btn-circle text-2xl'>
                          <FaTelegram/>
                        </button>
                        <button className='btn btn-ghost btn-circle text-2xl'>
                          <FaDiscord/>
                        </button>
                    </div>
                  </li>
                </ul>
              </div>
          
            </li>
            <li>
              <div className="flex justify-center items-center mt-20">
                <input
                  type="range"
                  className="range range-xs [--range-shdw:#2563eb] transform rotate-90 "
                  min="0"
                  max="100"
                  value={scrollValue}
                  onChange={handleScroll}
                />
              </div>
            </li>
          </ul>

        </div>
      </div>
      <div className={theme=="dark"?'grid-col border-gray-600':'grid-col'}>
        <div className="py-6 ps-5 ">
        <p className='text-2xl font-semibold'>{lang=="fa"?props.post?.title:props.post?.english_title}</p>
        <div className="flex justify-start items-center py-7">
                <Link 
                    to={`/categories/${props.post?.category.english_name}`} 
                    className='flex md:hidden border-2 border-blue-500 text-blue-500 hover:bg-blue-500 px-5 hover:text-white rounded-full items-center gap-2 text-xl'
                >
                  <BiCategory fontSize={18}/>
                  <p className='text-lg'>{lang=="fa"?props.post?.category.name:props.post?.category.english_name}</p>
                </Link>
        </div>
        <div className="flex  justify-start items-center gap-5 md:pt-10 px-4">
                <Link 
                    to={`/categories/${props.post?.category.english_name}`} 
                    className='hidden md:flex border-2 border-blue-500 text-blue-500 hover:bg-blue-500 px-5 hover:text-white rounded-full items-center gap-2 text-xl'
                >
                  <BiCategory fontSize={18}/>
                  <p className='text-lg'>{lang=="fa"?props.post?.category.name:props.post?.category.english_name}</p>
                </Link>
                  <div className='flex  justify-start items-center text-base'>
                    <PiClock />
                    <span>{props.post?.persian_date}</span>
                  </div>  
                  <div className="flex gap-1 items-center text-sm">
                    <BiBookReader fontSize={18}/>
                  <span>{props.post?.reading_time}</span>
                </div>
          </div>
        </div>

          <img src={showImage(props.post?.header_image)} alt="" className='w-full md:h-96 lg:h-[450px] rounded-xl border border-base-300 bg-base-300 shadow-lg' />

          <div className="py-5">
             
             <div className="py-10 max-w-sm md:w-full">
                <p className='text-md '>{lang=="fa"?props.post?.header:props.post?.english_header}</p>
                {props.post.text!=undefined && props.post?.english_text !=undefined  && <div className="py-4">
                  <div dangerouslySetInnerHTML={lang=="fa"?{ __html: props.post?.text }:{__html: props.post?.english_text}} />
                </div>}
             </div>
              

              {props.post?.keywords.length > 0 &&
            <div className={theme=="light"?"pb-20 mt-20 pt-5 border-t":"pb-20 mt-20 pt-5 border-t border-gray-600 "}>
              <p className="text-xl">#{t('keywords')}</p>
              <div className="px-2 py-5 grid xs:grid-cols-4 md:grid-cols-6 gap-10">
                  {props.post.keywords?.map((item:any,idx:number)=>(
                      <Link to={`/keywords/${item.english_name}`} key={idx}>    
                          <button  className='mini-item px-7'>{lang=="fa"?item.name:item.english_name}</button>
                      </Link>
                  ))}
              </div>
              </div>}
          </div>
          
          {props.others.filter((item:Post)=> item.post_id !==props.post.post_id ).length>0 &&  <div className={theme=="light"?"pb-16 pt-5 border-t":"pb-16 pt-5 border-t border-gray-600"}>
                <p className='text-xl'>{t('others')}</p>
                
                <div className='grid lg:grid-cols-3 gap-5  py-10' id='others'>
                    {props.others?.filter((item:Post)=> item.post_id !==props.post.post_id ).map((item:Post,idx:number)=>(
                      
                      idx <6 &&  <VerticalCard post={item} key={idx} theme={theme} reload={props.reload}/>
                    ))}
                  
                </div> 
          </div>}


      </div>
    </div>
  )
}
