import React, { useEffect, useState } from 'react'
import { PiClock, PiShareNetworkFill } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { Api, showImage } from '../api/Index'
import { useRecoilValue } from 'recoil'
import { langSelector, themeSelector, tokenSelector } from '../states/Selectors'
import { GoTrash } from "react-icons/go";
import { BiBookReader, BiPencil } from "react-icons/bi";
import { FaArrowUp } from 'react-icons/fa6';
import { BiCategory } from "react-icons/bi";
import { useTranslation } from 'react-i18next'
import { Post } from '../types'
import ShareModal from '../global/ShareModal'
import DeleteModal from '../global/DeleteModal'
import { message } from 'antd'
import { POSTS_ID } from '../api/Endpoints'
import PostCard from './PostCard'


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
    const token = useRecoilValue(tokenSelector)
    let navigate=useNavigate();
  
    message.config({
      top: 80,
    });

    let modalElement = document.getElementById('sharemodal') as HTMLDialogElement | null;
    let modalElementdel = document.getElementById('delmodal') as HTMLDialogElement | null;

    const handleShowShare=()=>{
     modalElement = document.getElementById('sharemodal') as HTMLDialogElement | null;
      modalElement?.showModal();
    }
    const handleClose=()=>{
      props.reload()
      modalElement?.close()
    }

  
    const handleShowDelete=()=>{
     modalElementdel = document.getElementById('delmodal') as HTMLDialogElement | null;
      modalElementdel?.showModal();
    }
    const handledelClose=()=>{
      props.reload()
      modalElementdel?.close()
    }
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  };

  const handleGotoEdit=()=>{
      navigate(`/posts/edit/${props.post.post_id}`);
  }
  const handleDelete=()=>{
      Api.delete(POSTS_ID(props.post.post_id)).then(()=>{
            message.success(t("removed"));
            props.reload()
          }).catch(()=>{
            message.error(t("notaccepted"))
      });
      handleClose()
  }


 
  return (
    <div className='detail-show '>
      <div className="hidden md:block minicol pb-40">
        <div className="ancher-show">

          <ul className="flex flex-col items-center ">
            {token.access?.length > 0 && <li>
              <button className="btn btn-ghost text-2xl" onClick={handleGotoEdit}>
                <BiPencil fontSize={30} />
              </button>
            </li>}
            {token.access?.length > 0 && <li>
              <button className="btn btn-ghost text-2xl" onClick={handleShowDelete}>
                <GoTrash />
              </button>
            </li>}
            <li>
              <button className="btn btn-ghost text-2xl text-blue-600"
                 onClick={handleShowShare}
              >
                  <PiShareNetworkFill />
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
      <div className={theme=="dark"?'grid-col border-gray-600':'grid-col'}>
                    <div
                      className={
                        scrollY > 10
                          ? "md:hidden  fixed bottom-3 right-3 w-100 shadow-lg z-20"
                          : "hidden"
                      }
                    >
                      
                        <button className="btn-blue rounded-2xl py-0 px-2 border border-blue-500" onClick={scrollToTop}>
                              <FaArrowUp fontSize={25}/>
                        </button>
                       
                    </div>
                    <div className="md:hidden  fixed bottom-3 left-3 w-100 shadow-lg z-20">
                      <button className="btn-blue rounded-2xl font-bold py-0 px-2"
                          onClick={handleShowShare}
                        >
                            <PiShareNetworkFill fontSize={25}/>
                        </button>  
                    </div>
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
        <div className="flex justify-between md:justify-start items-center gap-5 md:pt-10 md:px-4">
                <Link 
                    to={`/categories/${props.post?.category.english_name}`} 
                    className='hidden md:flex border-2 border-blue-500 text-blue-500 hover:bg-blue-500 px-5 hover:text-white rounded-full items-center gap-2 text-xl'
                >
                  <BiCategory fontSize={18}/>
                  <p className='text-lg'>{lang=="fa"?props.post?.category.name:props.post?.category.english_name}</p>
                </Link>
                  <div className='flex  justify-start items-center text-sm md:text-base'>
                    <PiClock fontSize={18} />
                    <span>{props.post?.persian_date}</span>
                  </div>  
                  <div className="flex gap-1 items-center text-sm md:text-base">
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
                      
                      idx <6 &&  <PostCard post={item} key={idx} theme={theme} reload={props.reload}/>
                    ))}
                  
                </div> 
          </div>}


      </div>

      <ShareModal type='posts' id={props.post.post_id?props.post.post_id:""} close={handleClose} />
      {props.post?.english_title!=undefined &&<DeleteModal 
          type="posttype" 
          name={props.post.title} 
          engname={props.post.english_title} 
          close={handledelClose} 
          delete={handleDelete}
      />}
    </div>
  )
}
