
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { BASE_URL ,showImage} from '../api/Index'
import { PiClock } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { BiBookReader } from "react-icons/bi";

interface projectProps{
  project:any;
}

export default function ProjectCard(props:projectProps) {

  let navigate=useNavigate()
  return (

     <Link to={`/projects/${props.project?.project_id}`}>
     <div className="card card-compact bg-base-100 w-76 shadow-xl md:card-move-up">
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
      </div>
      </Link>
  )
}
