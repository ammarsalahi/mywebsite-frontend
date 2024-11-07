import React, { useEffect, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import { Api } from '../api/Index'
import { PROJECT_SEARCH_FILTER ,PROJECTS,PROJECTS_ID,TECHNOLOGIES} from '../api/Endpoints'
import { message, Spin } from 'antd';
import Footer from '../global/Footer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { pageLoadSelector, projectSearchSelector, projfilterSelector, themeSelector } from '../states/Selectors'
import PorjectEmpty from '../global/PorjectEmpty';
import EmptyList from '../global/EmptyList';
import LoadMotion from '../global/LoadMotion';
import Swal from 'sweetalert2';
import { SiSharp } from "react-icons/si";
import { TfiReload } from 'react-icons/tfi';

export default function Projects() {
    const [projects,setProjects]=useState<any>([]);
    const [teches,setTeches]=useState<any>([]);
    const [isLoad,setisLoad]=useState(false)
    const projectsearch=useRecoilValue(projectSearchSelector)
    const filters=useRecoilValue(projfilterSelector)
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
    const theme=useRecoilValue(themeSelector)
    const [next,setNext]=useState<number|null>(null)


   
    const getFilters=async()=>{
      setisLoad(false)
      await Api.get(PROJECT_SEARCH_FILTER(projectsearch,1)).then((res)=>{
         setProjects(res.data.results)
      }).finally(()=>{
           setisLoad(true)
        })
    }
   const getTeches=async()=>{
    await Api.get(TECHNOLOGIES).then((res)=>{
        setTeches(res.data)
    });

   }


   const getNextPages=()=>{
    if(next!=null){
      Api.get(PROJECT_SEARCH_FILTER(projectsearch,next)).then((res)=>{
          setProjects((prevPosts:any )=> [...prevPosts, ...res.data.results]);
          setNext(res.data.next_page_number);
      })
    }
  }
  const handleKeywordSearch=(search:string)=>()=>{
    setisLoad(false)
    Api.get(PROJECT_SEARCH_FILTER(search,1)).then((res)=>{
       setProjects(res.data.results);
       setNext(res.data.next_page_number);
    }).finally(()=>{
         setisLoad(true)
    });
  }

    useEffect(() => {
      getFilters()
      getTeches()
      return () => {
        setProjects([])
      }
    }, [projectsearch])
    
    const handleDelete=(id:string,titles:string)=>()=>{
      Swal.fire({
        title:"آیا میخواهید پروژه موردنظر حذف شود؟!",
        text:`${titles}`,
        icon:"error",
        confirmButtonText:"بله",
        confirmButtonColor:"red",
        cancelButtonText:"نه,بیخیال",
        showCancelButton:true

      }).then((result)=>{
        if(result.isConfirmed){
          Api.delete(PROJECTS_ID(id)).then(()=>{
            message.success("با موفقیت حذف شد");
            getFilters()
          }).catch(()=>{
            message.error("متاسفانه مشکلی پیش آمد!")
          });
        }
      })
    }

    const sortDataByCreatedAt = (ascending: boolean) => {
      const sortedData = [...projects].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        
        if (ascending) {
          return dateA - dateB; // Ascending order
        } else {
          return dateB - dateA; // Descending order
        }
      });

      setProjects(sortedData);
    };
    useEffect(()=>{
      sortDataByCreatedAt(filters.assort)
   },[filters.assort])

  return (
   <div>
   {isLoad?<>
    <div className='paddingtop'>
        <div className='category-show pt-16 pb-6'>

            {teches.length>0 &&<div className="flex justify-start gap-3 pt-5 ">
              {teches?.map((item:any,idx:number)=>(
                <button  className='mini-item px-7 flex gap-2 items-center' key={idx} 
                  onClick={handleKeywordSearch(item.name)}>
                    <SiSharp fontSize={15}/>
                  {item.name}
                </button>
              ))}
            </div>}
        </div> 
        <div>
            {projects.length>0 ?
            <>
              <div className='post-card'>
                {projects?.map((item:any,idx:number)=>(
                    <ProjectCard project={item} theme={theme} key={idx} deleteProject={handleDelete(item.project_id,item.title)}/>
                ))}
              </div>
              {next!=null &&  <div className="flex justify-center py-10">
                 <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl' onClick={getNextPages}>
                  <TfiReload/>
                  بیشتر
                </button>
                </div>}
            </> 

            :
                <EmptyList name='پروژه‌ای'/>
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
