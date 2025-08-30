import { Button, message} from 'antd'
import ProjectCard from './ProjectCard'
import { TfiReload } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import { PROJECTS_ID } from '../api/Endpoints';
import { Api } from '../api/Index';
import { useTranslation } from 'react-i18next';
import { langSelector, tokenSelector } from '../states/Selectors';
import { useRecoilValue } from 'recoil';
import { Project } from '../types';
import { Link } from 'react-router-dom';

interface listprops{
  projects:Project[];
  reload:()=>void;
  theme:string
}
export default function LastProjects(props:listprops) {
  const {t} = useTranslation()
  const lang=useRecoilValue(langSelector)
  const token  = useRecoilValue(tokenSelector)

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
          props.reload()
        }).catch(()=>{
          message.error("متاسفانه مشکلی پیش آمد!")
        });
      }
    })
  }
  return (
    <div className='lasts'>
        <div className={lang=="fa"?'flex justify-start py-3 px-3 border-r-4 mb-5 border-blue-600':'flex justify-end py-3 px-3 border-l-4 mb-5 border-blue-600'}>
            <p className='text-3xl font-bold'>{t('lastp')}</p>
        </div>
          
    
       {props.projects?.length>0?
        <>
            <div className="last-list" dir={t('dir')}>
              {props.projects?.map((item:Project,idx:number)=>(
                <ProjectCard project={item} key={idx} theme={props.theme} reload={props.reload}/>
              ))}
            </div>
           {props.projects?.length > 8 && <div className="flex justify-center py-3">
              <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl'>
                <TfiReload/>
                {t('more')}
              </button>
            </div>}
        </>
        :
          <div className='no-list flex flex-col justify-center items-center p-4 gap-y-7'>
            <div className=" p-2 md:p-4 md:w-80 bg-red-300 text-center rounded-xl">
              <p className='text-xl text-red-700'>هیچ پروژه‌ای وجود ندارد!!!</p>
            </div>
            {token.access.length>0 && 
            <Link className='btn-blue-outline  w-full md:w-36' to={"/projects/add"}>
              {t('user3')}
            </Link>
          }
          </div>
       }
          
    </div>
  )
}
