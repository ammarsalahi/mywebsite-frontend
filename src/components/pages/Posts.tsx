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
      {/* <div className="pt-10 px-10">
      <div className='flex justify-start py-2 px-3 border-r-4 border-blue-500 '>
            <p className='text-3xl'>پست‌ها</p>
        </div>
      </div> */}
        
        <div className='category-show pt-7 pb-3'>

            {categories.length>0 &&<div className="flex justify-start gap-3 pt-5 ">
              {categories?.map((item:any,idx:number)=>(
                <button className='mini-item px-7 flex gap-2 items-center' key={idx} 
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
            <div>
              <div className='post-card'>
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
