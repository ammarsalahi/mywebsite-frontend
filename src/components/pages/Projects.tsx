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
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { PiFireFill } from 'react-icons/pi';
import { FaHammer } from 'react-icons/fa6';
import { MdFilterList } from 'react-icons/md';

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
    <div className='paddingtop md:px-8 lg:px-20'>

    <p className='text-center pb-8 text-4xl text-blue-600 font-bold flex justify-center items-center gap-2'>
          <FaHammer/>
          پروژه‌ها
        </p>
         
        <div className='flex justify-center items-center px-40 gap-2'>
        <div className={`card-${theme} border-2 border-blue-500 rounded-full`}>
            <div className="p-1 flex gap-0">
              <label className="input input-ghost input-sm w-[600px]  border-0 rounded-full flex items-center gap-2">
                <AiOutlineSearch className='text-blue-600 font-bold text-xl'/>
                <input type="text" className="grow" placeholder="جستجو..." />
                
                <div className="dropdown dropdown-right dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-full text-blue-500">
                <MdFilterList/>
                فیلترها   
                </div>
                <ul tabIndex={0} className={theme=="dark"?"drop-items bg-gray-900 text-white":"drop-items bg-white text-black"}>
                
                    <li>
                      <button className='text-green-600 text-base hover:bg-green-500 hover:text-white rounded-2xl'>
                        <AiOutlineSortAscending/>
                        صعودی 
                      </button>
                        
                    </li>
                    <li>
                      <button className='text-red-600 text-base hover:bg-red-500 hover:text-white rounded-2xl'>
                        <AiOutlineSortDescending/>
                         نزولی 
                      </button>
                        
                    </li>
                </ul>
              </div> 
              </label> 
              
            </div>
          </div>
          
        </div>
        <div className='category-show py-4'>

            {teches.length>0 &&<div className="flex flex-wrap justify-center gap-3 pt-5 ">
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
