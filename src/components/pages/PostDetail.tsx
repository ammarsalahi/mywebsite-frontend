import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import Detail from '../posts/Detail'
import { useParams } from 'react-router-dom'
import { Api } from '../api/Index';
import { POSTS_ID } from '../api/Endpoints';
export default function PostDetail() {
  const {id}=useParams();
  const [post,setPost]=useState();
  const getPost=()=>{
    Api.get(POSTS_ID(id)).then((res)=>{
        setPost(res.data)
    })
  }
  useEffect(() => {
  
    return () => {
    }
  }, [])
  
  return (
    <div>
        <Detail post={post}/>
    </div>
  )
}
