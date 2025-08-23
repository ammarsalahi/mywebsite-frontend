
import { Button, message } from 'antd'
import VerticalCard from './VerticalCard'
import { useRecoilValue } from 'recoil';
import { langSelector, themeSelector } from '../states/Selectors';
import { TfiReload } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import { POSTS_ID } from '../api/Endpoints';
import { Api } from '../api/Index';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../global/DeleteModal';

interface listprops{
  posts:[]|any;
  reload:()=>void;
  theme:string
}
export default function LastPosts(props:listprops) {
  const {t} = useTranslation();
  const lang=useRecoilValue(langSelector)
  let modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;

  const handleDelete=(id:string,titles:string)=>()=>{
   modalElement = document.getElementById('delmodal') as HTMLDialogElement | null;
    modalElement?.showModal();
    // Swal.fire({
    //   title:"آیا میخواهید پست موردنظر حذف شود؟!",
    //   text:`${titles}`,
    //   icon:"error",
    //   confirmButtonText:"بله",
    //   confirmButtonColor:"red",
    //   cancelButtonText:"نه,بیخیال",
    //   showCancelButton:true

    // }).then((result)=>{
    //   if(result.isConfirmed){
    //     Api.delete(POSTS_ID(id)).then(()=>{
    //       message.success("با موفقیت حذف شد");
    //       props.reload()
    //     }).catch(()=>{
    //       message.error("متاسفانه مشکلی پیش آمد!")
    //     });
    //   }
    // })
  }
  const handleClose=()=>{
    modalElement?.close()
  }
  return (
    <div className='lasts'>
        <div 
          className={lang=="fa"?'flex justify-start py-3 px-3 border-r-4 mb-5 border-blue-600':'flex justify-end py-3 px-3 border-l-4 mb-5 border-blue-600'}>
            <p className='text-3xl font-bold'>{t('last')}</p>
        </div>
    <div>
      
    {props.posts?.length>0 ?
        <> 
          <div className='last-list' dir={t('dir')}>
          {props.posts?.map((item:any,idx:number)=>(
            <div key={idx} className='py-4'>
            <VerticalCard post={item} theme={props.theme} deletePost={handleDelete(item.post_id,item.title)}/>
            </div>
          ))}
        </div>
        {props.posts?.length > 4 && <div className="flex justify-center py-3">
            <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl'>
              <TfiReload/>
              {t('more')}
            </button>
          </div>}
      </>
    :
        <div className=' no-list'>
          <div className=" p-2 lg:p-4  bg-red-300 text-center rounded-lg">
            <p className='text-xl text-red-700'>هیچ پستی وجود ندارد!!!</p>
          </div>
        </div>
    }

      </div>    

        <DeleteModal id={1} close={handleClose}/>
     </div>
  
   
  )
}


