import React, { useEffect, useState } from 'react'
import { PiClock, PiShareNetwork} from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ProjectCard from './ProjectCard'
import { showImage } from '../api/Index'
import ImageCarousel from './ImageCarousel'
import { useRecoilValue } from 'recoil'
import { langSelector, themeSelector } from '../states/Selectors'
import { BiBookReader, BiPencil } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'
import { MdOutlineMore } from 'react-icons/md'
import { Carousel } from 'antd'
import { useTranslation } from 'react-i18next'
import { Project } from '../types'

interface detailprops{
  project:Project;
  others:Project[];
  reload:()=>void

}
export default function DetailP(props:detailprops) {
  const theme=useRecoilValue(themeSelector)
  const {t} = useTranslation();
  const lang=useRecoilValue(langSelector)
  const [scrollValue, setScrollValue] = useState(0);


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
  let navigate=useNavigate()

  return (
 <div className='detail-show' dir={t('dir')}>
      <div className="minicol pb-40">
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
              <button className="btn btn-ghost text-2xl">
                <PiShareNetwork />
              </button>
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

      <div className='grid-col' >
      <div className="py-6 ps-5 ">
        <p className='text-2xl font-semibold'>{lang=="fa"?props.project?.title:props.project?.english_title}</p>
        <div className="flex justify-start gap-5 pt-10 px-4">
                
                  <div className='flex items-center text-base'>
                    <PiClock />
                    <span>{props.project?.persian_date}</span>
                  </div>  
                  <div className="flex gap-1 items-center text-sm">
                    <BiBookReader fontSize={18}/>
                  <span>{props.project?.reading_time}</span>
                </div>
          </div>
        </div>
          <img src={showImage(props.project?.header_image)} alt="" className='w-full h-96 lg:h-[450px] rounded-2xl' />
          {/* <div className="flex justify-start pt-3 pb-5 px-4">
                  <div className='flex items-center'>
                    <PiClock fontSize={20}/>
                    <span>{props.project?.persian_date}</span>
                  </div>

          </div> */}

          <div className="pb-5">
             
             <div className="py-10" >
                <div className="py-4">
                  <p className='text-md'>{lang=="fa"?props.project?.text:props.project?.english_text}</p>
                </div>
             </div>
                <div className="block md:hidden">
                         <ImageCarousel interval={1000}>
                            {props.project.images?.map((item:any,idx:number)=>(
                            <div key={idx}>
                              <img src={showImage(item.img)} className="w-96 h-96 rounded-xl shadow-xl" />
                            </div>
                            ))}
                          </ImageCarousel>
               </div>
               <div className='hidden md:block'>
                  <Carousel arrows draggable infinite autoplay>
                  {props.project.images?.map((item:any,idx:number)=>(
                            <div key={idx}>
                              <img src={showImage(item.img)} className="w-full h-96 rounded-xl shadow-xl" />
                            </div>
                            ))}
                  </Carousel>
               </div>
                     {props.project?.technologies.length > 0 &&
                  <div className={theme=="light"?"pb-20 mt-40 pt-5 border-t":"pb-20 mt-40 pt-5 border-t border-gray-600"}>
                      <p className="text-xl">{t('usetech')}</p>
                 <div className="px-2 py-5 grid xs:grid-cols-4 md:grid-cols-6 gap-10">
                        {props.project.technologies?.map((item:any,idx:number)=>(

                            <Link to={`/technologies/${item.english_name}`} key={idx}>
                            <div className="mini-item">
                              {lang=="fa"?item.name:item.english_name}
                             </div> 
                            </Link>
                        ))}
                    </div>
              </div>}
          </div>
     
          {props.others.length>0 && <div className={theme=="dark"?"pb-16 pt-5 border-t ":"pb-16 pt-5 border-t border-gray-600"}>
                <p className='text-xl'>{t('projothers')}</p>
                
                <div className='grid lg:xl:grid-cols-3 gap-2  py-10'>
                    {props.others?.map((item:any,idx:number)=>(
                      <>{item.project_id!==props.project.project_id && 
                        <ProjectCard project={item} key={idx} theme={theme} reload={()=>{}}/>
                      }</>
                  ))}
                  
                </div> 
          </div>}


      </div>
    </div>
  )
}
