
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { BASE_URL ,showImage} from '../api/Index'
import { PiClock } from 'react-icons/pi'

interface projectProps{
  project:any;
}

export default function ProjectCard(props:projectProps) {

  let navigate=useNavigate()
  return (
    <div className='px-3 shadow-md cursor-pointer'onClick={()=>navigate(`/projects/${props.project?.project_id}`)}>
      <img src={showImage(props.project?.header_image)} className='rounded-xl' />
      <div className='p-4'>
        <p className='text-2xl text-blue-600 pb-10'>{props.project?.title}</p>
        <div className="flex gap-2 pt-2 items-center text-gray-600">
                <PiClock fontSize={18}/>
          <span>{props.project?.persian_date}</span>
        </div>
        <div className='static px-4'>
            <div className="flex justify-center gap-4 py-4 text-gray-600 bottom-0">
                <button 
                   className='bg-blue-500 text-white text-xl p-2 rounded-full w-full'
                  onClick={()=>navigate(`/projects/${props.project?.project_id}`)}
                >نمایش</button>
            </div>
        </div>
        </div>
    </div>
  )
}
