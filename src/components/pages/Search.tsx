import { useEffect, useState } from 'react'
import { Api } from '../api/Index';
import PostCard from '../posts/PostCard';
import ProjectCard from '../projects/ProjectCard';
import EmptyList from '../global/EmptyList';
import Footer from '../global/Footer';
import { Spin } from 'antd';
import { SEARCH } from '../api/Endpoints';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageLoadSelector, themeSelector } from '../states/Selectors';

export default function Search() {
    const [isLoad,setisLoad]=useState(false)
    const [searches,setSearches]=useState<any>([]);
    const [_pageload,setpageLoad]=useRecoilState(pageLoadSelector);
    const theme =useRecoilValue(themeSelector)
    
    const {query}:any=useParams()
    const getSearch=async()=>{
        Api.get(SEARCH(query)).then((res)=>{
            setSearches(res.data)
            setisLoad(true)
        })
    }
    useEffect(() => {
      setpageLoad(true)
      getSearch()
    }, [query])
    
  return (
    <div>
    {isLoad?<>
     <div className='paddingtop'>
            <div className='pt-14 pb-10 items-center  flex justify-center md:justify-start'>
                <p className='text-xl'>نتایج برای </p>
                <p className="text-3xl font-bold mx-5">"{query}"</p>
            </div> 
         <div>
            {searches.length>0 ? <div className='post-card'>
                {searches?.map((item:any,idx:number)=>(
                    <>
                    {item.types=="post"?
                     <PostCard post={item} key={idx} theme={theme} reload={getSearch}/>
                    :
                     <ProjectCard project={item} key={idx} theme={theme} reload={getSearch}/>
                    }
                    </>
                ))}
             </div>
             :
              <EmptyList name='موردی'/>
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
