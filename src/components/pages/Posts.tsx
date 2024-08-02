import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import { Button, Dropdown, Input, MenuProps } from 'antd'
import { AiOutlineAppstore, AiOutlineClose, AiOutlineFire, AiOutlineMore, AiOutlinePlus, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineUnorderedList } from 'react-icons/ai'
import { PiFireFill, PiPen, PiTrash } from 'react-icons/pi'
import VerticalCard from '../posts/VerticalCard'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import AddCategory from '../posts/AddCategory'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { CATEGORIES, POST_SEARCH_FILTER, POSTS } from '../api/Endpoints'
import Item from 'antd/es/list/Item'
import { useRecoilValue,useRecoilState } from 'recoil'
import { filterSelector, postSearchSelector,islodingselector } from '../states/Selectors'
import HorizontalCard from '../posts/HorizontalCard'
import { Spin } from 'antd';

export default function Posts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [categories,setCategories]=useState<any>([])
  const postsearch=useRecoilValue(postSearchSelector)
  const [selectedCategory,setSelectedCategory]=useState("")

  const filters=useRecoilValue(filterSelector);
  const [isLoad,setisLoad]=useState(false);

  const getPosts=async()=>{
    await Api.get(POSTS).then((res)=>{
      setPosts(res.data)
    }).finally(()=>{
         setisLoad(true)
      })
  }
  const getFilters=async()=>{
    setisLoad(false)
    await Api.get(POST_SEARCH_FILTER(postsearch,filters.assort,selectedCategory)).then((res)=>{
       setPosts(res.data)
    }).finally(()=>{
         setisLoad(true)
      })
  }
  const getCategory=async()=>{
    await Api.get(CATEGORIES).then((res)=>{
      setCategories(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    getFilters()
    getCategory()
  
    return () => {
      setCategories([])
      setPosts([])
    }
  }, [filters])
  
 

  return (
  <div>
    {isLoad ? <>
     <div className='paddingtop'>
        <div className='category-show pt-16'>

            {categories.length>0 &&<div className="flex justify-start gap-3 pt-5 ">
              {categories?.map((item:any,idx:number)=>(
                <button  className='py-2 px-10 bg-blue-50 text-blue-800 font-bold  rounded-full hover:bg-blue-500 hover:text-white' key={idx} 
                onClick={()=>setSelectedCategory(item.id)}>{item.name}</button>
              ))}
            </div>}
        </div>    
        <div>   
           {posts.length>0?
          
            <>
            {filters.list==false? <div className='post-card'>
              {posts?.map((item:any,idx:number)=>(
                  <VerticalCard post={item} key={idx}/>
              ))}
            </div>
            :
            <div className="py-10">
              {posts?.map((item:any,idx:number)=>(
                <HorizontalCard  post={item} key={idx}/>
             ))}
                {posts?.length > 4 &&  <div className="flex justify-center py-10">
                <Button size='large' type='primary' className=' text-lg rounded-full' iconPosition='end'>بیشتر</Button>
                </div>}
             </div>
            }
            </>
            :
              <div className=' no-list'>
                <div className=" p-2 lg:p-4  bg-red-300 text-center rounded-lg">
                  <p className='text-xl text-red-700'>هیچ پستی وجود ندارد!!!</p>
                </div>
              </div>
        
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
