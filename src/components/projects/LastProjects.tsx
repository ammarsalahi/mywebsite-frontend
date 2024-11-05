import { Button, message} from 'antd'
import ProjectCard from './ProjectCard'
import { TfiReload } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import { PROJECTS_ID } from '../api/Endpoints';
import { Api } from '../api/Index';

interface listprops{
  projects:[]|any;
  reload:()=>void;
  theme:string
}
export default function LastProjects(props:listprops) {

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
        <div className='flex justify-start py-3 px-5 border-r-4 mb-5 border-blue-500 '>
            <p className='text-3xl font-bold'>پروژه‌های اخیر</p>
        </div>
          
    
       {props.projects?.length>0?
        <>
            <div className="last-list">
              {props.projects?.map((item:any,idx:number)=>(
                <ProjectCard project={item} key={idx} theme={props.theme} deleteProject={handleDelete(item.project_id,item.title)}/>
              ))}
            </div>
           {props.projects?.length > 8 && <div className="flex justify-center py-3">
              <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl'>
                <TfiReload/>
                بیشتر
              </button>
            </div>}
        </>
        :
          <div className='no-list'>
            <div className=" p-2 lg:p-4 bg-red-300 text-center rounded-lg">
              <p className='text-xl text-red-700'>هیچ پروژه‌ای وجود ندارد!!!</p>
            </div>
          </div>
       }
          
    </div>
  )
}
