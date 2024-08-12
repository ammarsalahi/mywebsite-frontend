import React, { useEffect, useState } from 'react'
import { Button} from 'antd'
import VerticalCard from '../posts/VerticalCard'
import { useNavigate } from 'react-router-dom'
import Footer from '../global/Footer'
import { Api } from '../api/Index'
import { CATEGORIES, POST_SEARCH_FILTER } from '../api/Endpoints'
import { useRecoilValue } from 'recoil'
import { filterSelector, postSearchSelector } from '../states/Selectors'
import HorizontalCard from '../posts/HorizontalCard'
import { Spin } from 'antd';
import EmptyList from '../global/EmptyList'

export default function Posts() {
  let navigate=useNavigate()
  const [posts,setPosts]=useState<any>([])
  const [categories,setCategories]=useState<any>([])
  const postsearch=useRecoilValue(postSearchSelector)
  const [selectedCategory,setSelectedCategory]=useState("")

  const filters=useRecoilValue(filterSelector);
  
  const [isLoad,setisLoad]=useState(false);

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
  }, [filters,postsearch])
  
 

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
