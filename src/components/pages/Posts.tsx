import React, { useEffect, useState } from 'react'
import { Button, message} from 'antd'
import VerticalCard from '../posts/VerticalCard'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { CATEGORIES, POST_SEARCH_FILTER, POSTS_ID } from '../api/Endpoints'
import { useRecoilState, useRecoilValue } from 'recoil'
import { filterSelector, pageLoadSelector, postSearchSelector, themeSelector } from '../states/Selectors'
import { Spin } from 'antd';
import EmptyList from '../global/EmptyList'
// import LoadMotion from '../global/LoadMotion'
import { TfiReload } from "react-icons/tfi";
import Swal from 'sweetalert2'
import { BiCategory } from "react-icons/bi";
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { PiFireFill, PiNewspaperFill } from 'react-icons/pi'
import { MdFilterList } from "react-icons/md";
import { CgClose } from 'react-icons/cg'

export default function Posts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [categories,setCategories]=useState<any>([])
  const [postsearch,setPostSearch]=useRecoilState(postSearchSelector)
  const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
  const [next,setNext]=useState<number|null>(null)
  


  const filters=useRecoilValue(filterSelector);
  
  const [isLoad,setisLoad]=useState(false);
  const theme=useRecoilValue(themeSelector)
  const modalElement = document.getElementById('searchmodal') as HTMLDialogElement | null;


  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setPostSearch(e.target.value)
  }

  const handleOpenModal=()=>{
      modalElement?.showModal();
  }

  const handleClose=()=>{
    modalElement?.close();
  }
  const getFilters=async()=>{
    setisLoad(false)
    await Api.get(POST_SEARCH_FILTER(postsearch,1)).then((res)=>{
       setPosts(res.data.results);
       setNext(res.data.next_page_number);
    }).finally(()=>{
         setisLoad(true)
    });
  }
  const getCategory=async()=>{
    await Api.get(CATEGORIES).then((res)=>{
      setCategories(res.data.results)
    })
  }

  const getNextPages=()=>{
    if(next!=null){
      Api.get(POST_SEARCH_FILTER(postsearch,next)).then((res)=>{
          setPosts((prevPosts:any )=> [...prevPosts, ...res.data.results]);
          setNext(res.data.next_page_number);
      })
    }
  }

  const handleDelete=(id:string,titles:string)=>()=>{
    Swal.fire({
      title:"آیا میخواهید پست موردنظر حذف شود؟!",
      text:`${titles}`,
      icon:"error",
      confirmButtonText:"بله",
      confirmButtonColor:"red",
      cancelButtonText:"نه,بیخیال",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        Api.delete(POSTS_ID(id)).then(()=>{
          message.success("با موفقیت حذف شد");
          getFilters()
        }).catch(()=>{
          message.error("متاسفانه مشکلی پیش آمد!")
        });
      }
    })
    
  }
  const handleCategorySearch=(search:string)=>()=>{
    console.log(search)
    setisLoad(false)
    Api.get(POST_SEARCH_FILTER(search,1)).then((res)=>{
       setPosts(res.data.results);
       setNext(res.data.next_page_number);
    }).finally(()=>{
         setisLoad(true)
    });
  }
  useEffect(() => {
    getFilters()
    getCategory()
    setpageLoad(true)
    return () => {
      setCategories([])
      setPosts([])
    }
  }, [postsearch])
  
 

      const sortDataByCreatedAt = (ascending: boolean) => {
        const sortedData = [...posts].sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          
          if (ascending) {
            return dateA - dateB; // Ascending order
          } else {
            return dateB - dateA; // Descending order
          }
        });

        setPosts(sortedData);
      };
   useEffect(()=>{
      sortDataByCreatedAt(filters.assort)
   },[filters.assort])


  return (
  <div>
    {isLoad ? <>
     <div className='paddingtop'>
        <div className="hidden fixed">
          <ul className={`filter-${theme}-menu`}>
            <li>
              <button className='text-xl' onClick={handleOpenModal}>
                <AiOutlineSearch/>
              </button>
            </li>
            <li>
              <button className='text-xl'>
                <PiFireFill/>
              </button>
            </li>
            <li>
              <button className='text-2xl '>
                <AiOutlineSortAscending/>
              </button>
            </li>
          </ul>  
          </div>
        <p className='text-center pb-8 text-4xl text-blue-600 font-bold flex justify-center items-center gap-2'>
          <PiNewspaperFill/>
          پست‌ها
        </p>
         
        <div className='flex justify-center items-center px-40 gap-2'>
        <div className={`card-${theme} border-2 border-blue-500 rounded-full`}>
            <div className="p-1 flex gap-0">
              <label className="input input-ghost input-sm w-96 lg:w-[650px]  border-0 rounded-full flex items-center gap-2">
                <AiOutlineSearch className='text-2xl '/>
                <input type="text" className="grow" placeholder="جستجو..." />
                <div className="dropdown dropdown-right dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-full ">
                <MdFilterList/>
                فیلترها   
                </div>
                <ul tabIndex={0} className={theme=="dark"?"drop-items bg-gray-900 text-white":"drop-items bg-white text-black"}>
                    <li>
                      <button 
                        className='text-orange-600 text-base hover:bg-orange-500 hover:text-white rounded-2xl'
                      >
                      <PiFireFill/>
                      تازه‌ها
                      </button>
                    </li>
                    <li>
                      <button className='text-green-600 text-base hover:bg-green-500 hover:text-white rounded-2xl'>
                        <AiOutlineSortAscending/>
                        صعودی 
                      </button>
                        
                    </li>
                    <li>
                      <button className='text-red-600 text-base hover:bg-red-500 hover:text-white rounded-2xl'>
                        <AiOutlineSortDescending/>
                         نزولی 
                      </button>
                        
                    </li>
                </ul>
              </div> 
              </label> 
                   
           
             
            </div>
          </div>
          
        </div>
        <div className='category-show py-4'>

            {categories.length>0 &&<div className="flex flex-wrap justify-center gap-3 pt-3 ">
              {categories?.map((item:any,idx:number)=>(
                <button className='mini-item px-5 flex gap-2 items-center' key={idx} 
                onClick={handleCategorySearch(item.name)}>
                  <BiCategory fontSize={20}/>
                  {item.name}
                </button>
              ))}
            </div>}
        </div>    
        <div>   
           {posts.length>0?
          
            <>
            <div >
           
              <div className='post-card gap-3 md:px-8 lg:px-20'>
              {posts?.map((item:any,idx:number)=>(
                 <div className="py-2" key={idx}>
                  <VerticalCard post={item}  deletePost={handleDelete(item?.post_id,item?.title)} theme={theme}/>
                 </div>
              ))}
               
            </div>
            {next!=null &&  <div className="flex justify-center py-10">
                 <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl' onClick={getNextPages}>
                  <TfiReload/>
                  بیشتر
                </button>
                </div>}
            </div> 
           
            </>
            :
             <EmptyList name="پستی"/>
        
            }
          
        </div>
        <dialog id={"searchmodal"} className="modal">
        <div className="modal-box py-3">
          <div className="flex justify-end ps-5 items-center">
              <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-10 px-5'>
              <label className="input input-bordered  w-full rounded-2xl flex items-center gap-2">
                <AiOutlineSearch className='text-2xl '/>
                <input type="text" className="grow" placeholder="جستجو..." value={postsearch} onChange={handleSearch}/>
              </label>
             
            </div>
        </div>
    </dialog>
     </div>
    <Footer/> 
    </>:
      <div className="h-screen w-screen grid place-items-center">
        <Spin size='large'/>
      </div>
    }
    </div>
  )
}
