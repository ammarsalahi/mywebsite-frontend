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
import { CATEGORIES, POSTS } from '../api/Endpoints'
import Item from 'antd/es/list/Item'
import { useRecoilValue } from 'recoil'
import { filterSelector } from '../states/Selectors'
import HorizontalCard from '../posts/HorizontalCard'

export default function Posts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [categories,setCategories]=useState<any>([])



  const filters=useRecoilValue(filterSelector);
  
  const getPosts=async()=>{
    await Api.get(POSTS).then((res)=>{
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
  }, [])
  
 

  return (
    <div>
        <Navbar/>
        <div className='px-20 pt-4'>

            <div className="flex justify-center gap-3 pt-5 ">
              {categories?.map((item:any,idx:number)=>{
                <button  className='p-2 border-0  rounded-xl hover:bg-gray-200' key={idx}>{item.name}</button>
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
              <div className='py-20 px-40 items-center'>
                <div className="p-5 bg-red-300">
                  <p className='text-xl text-red-700'>هیچ پستی وجود ندارد!!!</p>
                </div>
              </div>
        
            }
          
        </div>
        <Footer/>
    </div>
  )
}
