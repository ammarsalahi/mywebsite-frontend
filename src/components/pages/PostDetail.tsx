import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import Detail from '../posts/Detail'
import { useParams } from 'react-router-dom'
import { Api } from '../api/Index';
import { POSTS_DETAIL_ID, POSTS_ID,NEW_POSTS } from '../api/Endpoints';
import Footer from '../global/Footer';
import { Spin } from 'antd';
import LoadMotion from '../global/LoadMotion';
import { useRecoilState } from 'recoil';
import { pageLoadSelector } from '../states/Selectors';
import EmptyList from '../global/EmptyList';


export default function PostDetail() {
  const {id}=useParams();
  const [post,setPost]=useState<any>([]);
  const [others,setothers]=useState<any>([]);
  const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
  const [isPost,setIsPost]=useState(true)
  const [isLoad,setisLoad]=useState(false)
 
  const getPost=()=>{
    Api.get(POSTS_DETAIL_ID(id)).then((res)=>{
        setPost(res.data.posts)
        setothers(res.data.others)
    }).catch((err)=>{
      setIsPost(false)
    }).finally(()=>{
      setisLoad(true)

    })
  }
  useEffect(() => {
      getPost()
      setpageLoad(true)
  }, [id])
  
  return (
    <>
       {isLoad ? <><div className='paddingtop'>
        {isPost?
        <Detail post={post} others={others}/>
        :
        <EmptyList name='not'/>
      }
       </div>
       <Footer/>
       </> :
        <div className="h-screen w-screen grid place-items-center">
        <Spin size='large'/>
      </div>   
       }
    </>
 
  )
}
