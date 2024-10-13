
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
}

export default function ProjectCard(props:projectProps) {

  let navigate=useNavigate();
  const handleEdit=(id:string)=>()=>{
      navigate(`/projects/edit/${id}`)
  }
  const token=useRecoilValue(tokenSelector)
  return (

    <div className="card card-compact bg-base-100 w-76 shadow-xl card-move-up">
      <Link to={`/projects/${props.project?.project_id}`}>

        <figure>
          <img
            src={showImage(props.project?.header_image)}
            alt="projects" className="h-52 w-full"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title py-3 text-blue-600">{props.project?.title}</h2>
            <div className="flex justify-between py-3 ">
            <div className="flex gap-1 items-center text-gray-600">
                <PiClock fontSize={18}/>
                <span>{props.project?.persian_date}</span>
            </div>
            <div className="flex gap-1 items-center text-gray-600">
                <BiBookReader fontSize={18}/>
              <span>{props.project?.reading_time}</span>
            </div>
            </div>
         
        </div>
        </Link>
       {token.access?.length>0 && <div className="card-actions flex justify-content">
        <button 
            className='btn btn-ghost btn-sm text-base text-blue-500'
            onClick={handleEdit(props.project?.post_id)}
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
