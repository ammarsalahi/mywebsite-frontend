import { useEffect, useState } from 'react'
import Detail from '../posts/Detail'
import { useParams } from 'react-router-dom'
import { Api } from '../api/Index';
import { POSTS_DETAIL_ID } from '../api/Endpoints';
import Footer from '../global/Footer';
import { Spin } from 'antd';
import { useRecoilState } from 'recoil';
import { pageLoadSelector } from '../states/Selectors';
import EmptyList from '../global/EmptyList';
import { Post } from '../types';


export default function PostDetail() {
  const {id}=useParams();
  const [post,setPost]=useState<Post|null>();
  const [others,setothers]=useState<Post[]>([]);
  const [_pageload,setpageLoad]=useRecoilState(pageLoadSelector);
  const [isPost,setIsPost]=useState(true)
  const [isLoad,setisLoad]=useState(false)
 
  const getPost=()=>{
    Api.get(POSTS_DETAIL_ID(id)).then((res)=>{
        setPost(res.data.posts)
        setothers(res.data.others)
    }).catch((_)=>{
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
        {isPost && post?
        <Detail post={post} others={others} reload={getPost}/>
        :
        <EmptyList name="پستی"/>
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
