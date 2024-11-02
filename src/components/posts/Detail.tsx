import React, { useRef, useState } from 'react'
import VerticalCard from './VerticalCard'
import { PiSubtitles, PiTextAlignRight,PiNewspaperClipping, PiClock, PiShareNetwork } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { showImage } from '../api/Index'
import { useRecoilValue } from 'recoil'
import { themeSelector } from '../states/Selectors'
import { BiPencil, BiTrashAlt } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa6'
import { FaTrashAlt } from 'react-icons/fa'
import NewPosts from './newPosts'


interface detailprops{
  post:any;
  others:any;
}
export default function Detail(props:detailprops) {
  const theme=useRecoilValue(themeSelector)
 
  const titleref=useRef(null);
  const textref=useRef(null);
  const otherref=useRef(null);

  const [refName,setRefName]=useState("");

  let navigate=useNavigate();

  const handleSelectRef=(selection:any,name:string)=>()=>{
    selection.current.scrollIntoView({ behavior: 'smooth' });
    setRefName(name)
  }



 
  return (
    <div className='detail-show '>
      <div className="minicol">
        <div className="ancher-show py-3">
          <ul className="menu bg-base-200 rounded-box">
            <div>
              <div className="flex items-center justify-between mb-1 px-5">
                <button className='btn  btn-circle'>
                  <BiPencil fontSize={30}/>
                </button>
                <button className='btn btn-circle'>
                  <FaTrashAlt fontSize={27}/>
                </button>
              </div>
            </div>
            <li>
              <a className={refName=="title"?"anchor-selected mb-1 hover:bg-blue-600":"anchor-unselected mb-1 hover:bg-blue-600"} onClick={handleSelectRef(titleref,"title")}>
                <PiSubtitles fontSize={30}/>
                <span>عنوان</span>
              </a>
            </li>
            <li>
              <a className={refName=="text"?"anchor-selected mb-1 hover:bg-blue-600":"anchor-unselected mb-1 hover:bg-blue-600"} onClick={handleSelectRef(textref,"text")}>
                <PiTextAlignRight fontSize={30}/>
                <span>متن پست</span>

              </a>
            </li>
            <li>
              <a className={refName=="other"?"anchor-selected mb-1 hover:bg-blue-600":"anchor-unselected mb-1 hover:bg-blue-600"} onClick={handleSelectRef(otherref,"other")}>
                <PiNewspaperClipping fontSize={30}/>
                <span>پست‌های مشابه</span>
              </a>
            </li>
            <li>
              <a className="anchor-unselected hover:bg-blue-600 mb-1">
                <PiShareNetwork fontSize={30}/>
                <span>اشتراک‌گذاری</span>

              </a>
            </li>
            
          </ul>
          <NewPosts theme={theme}/>

        </div>
      </div>
      <div className={theme=="dark"?'grid-col border-gray-600':'grid-col'} ref={titleref}>
          <img src={showImage(props.post?.header_image)} alt="" className='w-full h-96 rounded-2xl border border-base-300 bg-base-300' />
          <div className="flex justify-between py-3 px-4">
                <Link to={`/categories/${props.post?.category.english_name}`} >
                  <p className='text-lg'>{props.post?.category.name}</p>
                </Link>
                  <div className='flex items-center text-base'>
                    <PiClock />
                    <span>{props.post?.persian_date}</span>
                  </div>

                  
          </div>

          <div className="py-5">
              <p className='text-3xl'>{props.post?.title}</p>
             
             <div className="py-10" ref={textref}>
                <p className='text-md'>{props.post?.header}</p>
                <div className="py-4">
                  <div dangerouslySetInnerHTML={{ __html: props.post?.text }} />
                </div>
             </div>
              

              {props.post?.keywords.length > 0 &&
            <div className={theme=="light"?"pb-20 mt-20 pt-5 border-t":"pb-20 mt-20 pt-5 border-t border-gray-600 "}>
              <p className="text-xl">#کلمات کلیدی</p>
              <div className="px-2 py-5 grid xs:grid-cols-4 md:grid-cols-6 gap-10">
                  {props.post.keywords?.map((item:any,idx:number)=>(
                      <Link to={`/keywords/${item.english_name}`} key={idx}>    
                          <button  className='mini-item px-7'>{item.name}</button>
                      </Link>
                  ))}
              </div>
              </div>}
          </div>
          
          {props.others.length>0 && <div className={theme=="light"?"pb-16 pt-5 border-t":"pb-16 pt-5 border-t border-gray-600"} ref={otherref}>
                <p className='text-xl'>پست‌های مشابه</p>
                
                <div className='grid lg:grid-cols-3 gap-5  py-10' id='others'>
                    {props.others?.map((item:any,idx:number)=>(
                      
                      idx <3 &&  <VerticalCard post={item} key={idx} theme={theme} deletePost={()=>{}}/>
                    ))}
                  
                </div> 
          </div>}


      </div>
    </div>
  )
}
