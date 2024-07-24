
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { BASE_URL ,showImage} from '../api/Index'

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
        <div className='static px-4'>
            <div className="flex justify-center gap-4 py-4 text-gray-600 bottom-0">
                <Button 
                  block className='rounded-full'
                  size='large' type='primary'
                  onClick={()=>navigate(`/projects/${props.project?.project_id}`)}
                >نمایش</Button>
            </div>
        </div>
        </div>
    </div>
  )
}
