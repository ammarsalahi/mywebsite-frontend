import React, { useEffect, useState } from 'react'
import { Button, message} from 'antd'
import VerticalCard from '../posts/VerticalCard'
import { useNavigate } from 'react-router-dom'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { CATEGORIES, POST_SEARCH_FILTER, POST_SEARCH_FILTER_NEXT, POSTS_ID } from '../api/Endpoints'
import { useRecoilState, useRecoilValue } from 'recoil'
import { filterSelector, pageLoadSelector, postSearchSelector } from '../states/Selectors'
import HorizontalCard from '../posts/HorizontalCard'
import { Spin } from 'antd';
import EmptyList from '../global/EmptyList'
// import LoadMotion from '../global/LoadMotion'
import { TfiReload } from "react-icons/tfi";


export default function Posts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [categories,setCategories]=useState<any>([])
  const postsearch=useRecoilValue(postSearchSelector)
  const [selectedCategory,setSelectedCategory]=useState("")
  const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
  const [next,setNext]=useState<number|null>(null)

  const filters=useRecoilValue(filterSelector);
  
  const [isLoad,setisLoad]=useState(false);

  const getFilters=async()=>{
    setisLoad(false)
    await Api.get(POST_SEARCH_FILTER(postsearch,filters.assort,selectedCategory)).then((res)=>{
       setPosts(res.data.results);
       setNext(res.data.next_page_number);

    }).finally(()=>{
         setisLoad(true)
      })
  }
  const getCategory=async()=>{
    await Api.get(CATEGORIES).then((res)=>{
      setCategories(res.data)
    })
  }

  const getNextPages=()=>{
    if(next!=null){
      Api.get(POST_SEARCH_FILTER_NEXT(next)).then((res)=>{
          setPosts((prevPosts:any )=> [...prevPosts, ...res.data.results]);
          setNext(res.data.next_page_number);
      })
    }
  }

  const handleDelete=(id:string)=>()=>{
    Api.delete(POSTS_ID(id)).then(()=>{
      message.success("با موفقیت حذف شد");
      getFilters()
    }).catch(()=>{
      message.error("متاسفانه مشکلی پیش آمد!")
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

  }, [])
  
 

  return (
  <div>
    {isLoad ? <>
     <div className='paddingtop'>
        <div className='category-show pt-12 pb-6'>

            {categories.length>0 &&<div className="flex justify-start gap-3 pt-5 ">
              {categories?.map((item:any,idx:number)=>(
                <button  className='mini-item px-7' key={idx} 
                onClick={()=>setSelectedCategory(item.id)}>{item.name}</button>
              ))}
            </div>}
        </div>    
        <div>   
           {posts.length>0?
          
            <>
            {filters.list==false?<div>
              <div className='post-card'>
              {posts?.map((item:any,idx:number)=>(
                 <div className="py-4" key={idx}>
                  <VerticalCard post={item}  deletePost={handleDelete(item?.post_id)}/>
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
            :
            <div className="py-10">
              {posts?.map((item:any,idx:number)=>(
                <HorizontalCard  post={item} key={idx}/>
             ))}
                {next!=null &&  <div className="flex justify-center py-10">
                  <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl' onClick={getNextPages}>
                  <TfiReload/>
                  بیشتر
                </button>
                </div>}
             </div>
            }
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
