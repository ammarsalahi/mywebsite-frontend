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
import { useRecoilValue } from 'recoil'
import { filterSelector, postSearchSelector } from '../states/Selectors'
import HorizontalCard from '../posts/HorizontalCard'

export default function Posts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [categories,setCategories]=useState<any>([])
  const postsearch=useRecoilValue(postSearchSelector)
  const [selectedCategory,setSelectedCategory]=useState("")

  const filters=useRecoilValue(filterSelector);
  
  const getPosts=async()=>{
    await Api.get(POSTS).then((res)=>{
      setPosts(res.data)
    })
  }
  const getFilters=async()=>{
    await Api.get(POST_SEARCH_FILTER(postsearch,filters.assort,selectedCategory)).then((res)=>{
       setPosts(res.data)
    })
  }
  const getCategory=async()=>{
    await Api.get(CATEGORIES).then((res)=>{
      setCategories(res.data)
    })
  }

  useEffect(() => {
    getPosts()
    getCategory()
  
    return () => {
      setCategories([])
      setPosts([])
    }
  }, [filters])
  
 

  return (
    <div>
        <div className='px-5 lg:px-20 xl:px-20 2xl:px-20 md:px-10 pt-4'>

            <div className="flex justify-center gap-3 pt-5 ">
              {categories?.map((item:any,idx:number)=>{
                <button  className='p-2 border-0  rounded-xl hover:bg-gray-200' key={idx} 
                onClick={()=>setSelectedCategory(item.name)}>{item.name}</button>
              })}
            </div>
            
           
          {posts.length>0?
          
            <>
            {filters.list==false? <div className='post-card'>
              {posts?.map((item:any,idx:number)=>(
                  <VerticalCard post={item} key={idx}/>
              ))}
            </div>
            :
            <div>
              {posts?.map((item:any,idx:number)=>(
                <HorizontalCard  post={item} key={idx}/>
             ))}
                <div className="flex justify-center py-10">
                <Button size='large' type='primary' className=' text-lg rounded-full' iconPosition='end'>بیشتر</Button>
                </div>
             </div>
            }
            </>
            :
              <div className=' py-20 px-10 md:px-20 md:py-20 xl:px-40 xl:py-40  2xl:py-40 2xl:px-40 lg:py-40 lg:px-40  items-center'>
                <div className=" p-2 lg:p-4  bg-red-300 text-center rounded-lg">
                  <p className='text-xl text-red-700'>هیچ پستی وجود ندارد!!!</p>
                </div>
              </div>
        
            }
          
        </div>
        {/* <Footer/> */}
    </div>
  )
}
