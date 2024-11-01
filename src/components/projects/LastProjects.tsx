import { Button} from 'antd'
import ProjectCard from './ProjectCard'
import { TfiReload } from 'react-icons/tfi';

interface listprops{
  projects:[]|any;
}
export default function LastProjects(props:listprops) {
  return (
    <div className='lasts'>
        <div className='flex justify-start py-3 px-5 border-r-4 mb-5 border-blue-500 '>
            <p className='text-3xl font-bold'>پروژه‌های اخیر</p>
        </div>
          
    
       {props.projects?.length>0?
        <>
            <div className="last-list">
              {props.projects?.map((item:any,idx:number)=>(
                <ProjectCard project={item} key={idx} deleteProject={()=>{}}/>
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
