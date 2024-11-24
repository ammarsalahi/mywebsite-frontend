import React, { useEffect, useState } from 'react'
import ProjectCard from '../projects/ProjectCard'
import { Api } from '../api/Index'
import { PROJECT_SEARCH_FILTER ,PROJECTS,PROJECTS_ID,TECHNOLOGIES} from '../api/Endpoints'
import { message, Spin } from 'antd';
import Footer from '../global/Footer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { langSelector, pageLoadSelector, projectSearchSelector, projfilterSelector, themeSelector } from '../states/Selectors'
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
import { CgClose } from 'react-icons/cg';
import { FaArrowLeft } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

export default function Projects() {
    const [projects,setProjects]=useState<any>([]);
    const [teches,setTeches]=useState<any>([]);
    const [isLoad,setisLoad]=useState(false)
    const [projectsearch,setProjectSearch]=useRecoilState(projectSearchSelector)
    const [filters,setFilters]=useRecoilState(projfilterSelector)
    const [pageload,setpageLoad]=useRecoilState(pageLoadSelector);
    const theme=useRecoilValue(themeSelector)
    const [next,setNext]=useState<number|null>(null)
    const [search,setSearch]=useState("");

    const {t}=useTranslation()
    const lang=useRecoilValue(langSelector)

   
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

  const handleFilters=(name:string,value:boolean)=>()=>{
    setFilters({...filters,[name]:value});
    sortDataByCreatedAt(filters.assort)

  }
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value)
  }
  const handlePostSearch=()=>{
    setProjectSearch(search)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
          handlePostSearch()
    }
  };

    const modalElement = document.getElementById('searchmodal') as HTMLDialogElement | null;

      const handleOpenModal=()=>{
          modalElement?.showModal();
      }

      const handleClose=()=>{
        modalElement?.close();
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


   const [scrollY, setScrollY] = useState<number>(1); 
   useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 0) {
        // Calculate the scroll percentage and map it to a range of 1-100
        const scrollPercent = (window.scrollY / maxScroll) * 100;
        const clampedScrollY = Math.min(Math.max(scrollPercent, 1), 100);
        setScrollY(clampedScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
   <div>
   {isLoad?<>
    <div className='paddingtop '>
    <div className={scrollY >35?"block fixed":"hidden"}>
          <ul className={`filter-${theme}-menu`}>
            <li>
              <button className='text-xl' onClick={handleOpenModal}>
                <AiOutlineSearch/>
              </button>
            </li>
           
            <li>
              <button className='text-2xl'
                  onClick={handleFilters('assort',!filters.assort)}
              >
                {filters.assort ?
                  <AiOutlineSortAscending className='text-green-500'/>
                  :
                  <AiOutlineSortDescending className='text-red-500'/>
                }
              </button>
            </li>
          </ul>  
          </div>
        <p className='text-center pb-8 text-4xl text-blue-600 font-bold flex justify-center items-center gap-2'>
          <FaHammer/>
          {t('menu2')}
        </p>
         
        <div className='flex justify-center items-center px-40 gap-2'>
        <div className={`card-${theme} border-2 border-blue-500 rounded-full`}>
            <div className="p-1 flex gap-0">
              <label className="input input-ghost input-sm w-[600px]  border-0 rounded-full flex items-center gap-2" dir={t('dir')}>
                <AiOutlineSearch className='text-2xl'/>
                <input type="text" className="grow" placeholder={t('projsearch')} 
                  value={search} onChange={handleSearch} onKeyDown={handleKeyDown}
                />
                {search.length>0 &&
                <button className="btn btn-sm btn-ghost" onClick={handlePostSearch}>
                  {lang=="fa"?<FaArrowLeft className="text-xl"/>:<FaArrowRight className="text-xl"/>}
                </button>}
                <div className="dropdown dropdown-right dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm rounded-full">
                <MdFilterList/>
                {t('filters')}   
                </div>
                <ul tabIndex={0} className={theme=="dark"?"drop-items bg-gray-900 text-white":"drop-items bg-white text-black"} >
                
                    <li>
                      <button className='text-green-600 text-base hover:bg-green-500 hover:text-white rounded-2xl' >
                        {<AiOutlineSortAscending/>}
                        {t('asc')} 
                      </button>
                        
                    </li>
                    <li>
                      <button className='text-red-600 text-base hover:bg-red-500 hover:text-white rounded-2xl'>
                       <AiOutlineSortDescending/>
                         {t('desc')} 
                      </button>
                        
                    </li>
                </ul>
              </div> 
              </label> 
              
            </div>
          </div>
          
        </div>
        <div className='category-show py-4'>
                
            {teches.length>0 &&<div className="flex flex-wrap justify-center gap-3 pt-5" dir={t('dir')}>
              <button  className='mini-item px-7 flex gap-2 items-center'
                  onClick={handleKeywordSearch("")}>
                    <SiSharp fontSize={15}/>
                  {t('all')}
                </button>
              {teches?.map((item:any,idx:number)=>(
                <button  className='mini-item px-7 flex gap-2 items-center' key={idx} 
                  dir={t('dir')}
                  onClick={handleKeywordSearch(item.name)}>
                    <SiSharp fontSize={15}/>
                    {lang=="fa"?item.name:item.english_name}
                </button>
              ))}
            </div>}
        </div> 
        <div>
            {projects.length>0 ?
            <>
              <div className='post-card gap-3 md:px-8 lg:px-20'  dir={t("dir")}>
                {projects?.map((item:any,idx:number)=>(
                    <ProjectCard project={item} theme={theme} key={idx} deleteProject={handleDelete(item.project_id,item.title)}/>
                ))}
              </div>
              {next!=null &&  <div className="flex justify-center py-10">
                 <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl' onClick={getNextPages}>
                  <TfiReload/>
                  {t('more')}
                </button>
                </div>}
            </> 

            :
                <EmptyList name='noproject'/>
            }
        </div>
        <dialog id={"searchmodal"} className="modal ">
        <div className={theme=="dark"?"modal-box py-3 bg-black":"modal-box py-3 bg-gray-400"}>
          <div className="flex justify-end ps-5 items-center">
              <button className='btn btn-circle btn-ghost text-2xl font-semibold' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-10 px-5'>
              <p className='text-2xl mb-4 text-center  font-semibold'>{t("projsearch")}</p>
              <label className="input   w-full rounded-full flex items-center gap-2" dir={t("dir")}>  
                <AiOutlineSearch className='text-2xl '/>
                <input type="text" className="grow" placeholder={t("search")} 
                value={search} onChange={handleSearch} onKeyDown={handleKeyDown}
                />
                {search.length>0 &&
                  <button className="btn btn-sm btn-ghost" onClick={handlePostSearch}>
                  {lang=="fa"?<FaArrowLeft className="text-xl"/>:<FaArrowRight className="text-xl"/>}
                </button>}
              </label>
             
            </div>
        </div>
    </dialog>
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
