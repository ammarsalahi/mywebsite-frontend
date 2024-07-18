import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import Detail from '../posts/Detail'
import { useParams } from 'react-router-dom'
import { Api } from '../api/Index';
import { POSTS_DETAIL_ID, POSTS_ID } from '../api/Endpoints';
export default function PostDetail() {
  const {id}=useParams();
  const [post,setPost]=useState();
  const [others,setothers]=useState();

  const [isLoad,setisLoad]=useState(false)
  const getPost=()=>{
    Api.get(POSTS_DETAIL_ID(id)).then((res)=>{
        setPost(res.data.posts)
        setothers(res.data.others)
        setisLoad(true)
    })
  }
  useEffect(() => {
      getPost()
    
  }, [])
  
  return (
    <div>
        {isLoad && <Detail post={post} others={others}/>}
    </div>
  )
}
