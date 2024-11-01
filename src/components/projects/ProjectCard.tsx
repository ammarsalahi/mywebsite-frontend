
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { BASE_URL ,showImage} from '../api/Index'
import { PiClock } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { BiBookReader, BiPencil } from "react-icons/bi";
import { FaTrash } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';

interface projectProps{
  project:any;
  deleteProject:() => void;
  theme:string;
}

export default function ProjectCard(props:projectProps) {

  let navigate=useNavigate();
  const handleEdit=(id:string)=>()=>{
      navigate(`/projects/edit/${id}`)
  }
  const token=useRecoilValue(tokenSelector)
  return (

    <div className={`card-${props.theme} w-auto rounded-lg shadow-lg`}>
      <Link to={`/projects/${props.project?.project_id}`}>

        <figure>
          <img
            src={showImage(props.project?.header_image)}
            alt="projects" className="h-52 w-full rounded-t-lg bg-gray-400"/>
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title py-3 ">{props.project?.title}</h2>
            <div className="flex justify-between py-3 ">
            <div className="flex gap-1 items-center text-sm">
                <PiClock fontSize={18}/>
                <span>{props.project?.persian_date}</span>
            </div>
            <div className="flex gap-1 items-center text-sm">
                <BiBookReader fontSize={18}/>
              <span>{props.project?.reading_time}</span>
            </div>
            </div>
         
        </div>
        </Link>
       {token.access?.length>0 && <div className="card-actions flex justify-between px-5 pb-2">
        <button 
            className='btn btn-ghost btn-sm text-base text-blue-500'
            onClick={handleEdit(props.project?.project_id)}
          >
            ویرایش                  
            <BiPencil className='text-xl'/>
          </button>
          <button 
            className='btn btn-ghost btn-sm text-base text-red-500'
            onClick={props.deleteProject}
          >
            حذف
            <FaTrash className='text-xl'/>
          </button> 
        </div>}
      </div>
  )
}
