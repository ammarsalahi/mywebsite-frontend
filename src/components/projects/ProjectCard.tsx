
import { Button, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { Api, BASE_URL ,showImage} from '../api/Index'
import { PiClock } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { BiBookReader, BiPencil } from "react-icons/bi";
import { FaTrash } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { langSelector, tokenSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';
import { PROJECTS_ID } from '../api/Endpoints';
import DeleteModal from '../global/DeleteModal';

interface projectProps{
  project:any;
  reload:() => void;
  theme:string;
}

export default function ProjectCard(props:projectProps) {

  let navigate=useNavigate();
  const {t} = useTranslation()
  const lang=useRecoilValue(langSelector)
  const handleEdit=(id:string)=>()=>{
      navigate(`/projects/edit/${id}`)
  }
  const token=useRecoilValue(tokenSelector);

   message.config({
      top: document.documentElement.clientHeight - 100,
    });
    let modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
    
      const handleShowDelete=()=>{
       modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
        modalElement?.showModal();
      }
      const handleClose=()=>{
        props.reload()
        modalElement?.close()
      }
  
    const handleDelete=()=>{
        Api.delete(PROJECTS_ID(props.project.project_id)).then(()=>{
              message.success("با موفقیت حذف شد");
              props.reload()
            }).catch(()=>{
              message.error("متاسفانه مشکلی پیش آمد!")
        });
        handleClose()
    }

  return (

    <div className={`card-${props.theme} w-auto rounded-lg shadow-lg`} dir={t('dir')}>
      <Link to={`/projects/${props.project?.project_id}`}>

        <figure>
          <img
            src={showImage(props.project?.header_image)}
            alt="projects" className="h-52 w-full rounded-t-lg bg-gray-400"/>
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title py-3 ">{lang=="fa"?props.project?.title:props.project?.english_title}</h2>
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
            className='btn btn-ghost btn-circle btn-sm text-base text-blue-500'
            onClick={handleEdit(props.project?.project_id)}
          >                  
            <BiPencil className='text-xl'/>
          </button>
          <button 
            className='btn btn-ghost btn-circle btn-sm text-base text-red-500'
            onClick={handleShowDelete}
          >
            <FaTrash className='text-xl'/>
          </button> 
        </div>}
            <DeleteModal 
                    type="projtype" 
                    name={props.project.title} 
                    engname={props.project.english_title} 
                    close={handleClose} 
                    delete={handleDelete}
            />
      </div>
  )
}
