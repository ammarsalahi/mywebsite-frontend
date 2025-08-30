
import { Button, message } from 'antd'
import VerticalCard from './VerticalCard'
import { useRecoilValue } from 'recoil';
import { langSelector, themeSelector, tokenSelector } from '../states/Selectors';
import { TfiReload } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import { POSTS_ID } from '../api/Endpoints';
import { Api } from '../api/Index';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../global/DeleteModal';
import { Post } from '../types';
import { Link } from 'react-router-dom';

interface listprops{
  posts:Post[];
  reload:()=>void;
  theme:string
}
export default function LastPosts(props:listprops) {
  const {t} = useTranslation();
  const lang=useRecoilValue(langSelector);
  const token  = useRecoilValue(tokenSelector)
  
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
            <VerticalCard post={item} theme={props.theme} reload={props.reload}/>
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
        <div className=' no-list flex flex-col justify-center items-center p-4 gap-y-7'>
          <div className=" p-2 md:p-4 md:w-80 bg-red-300 text-center rounded-xl">
            <p className='text-xl text-red-700'>هیچ پستی وجود ندارد!!!</p>
          </div>
          {token.access.length>0 && 
            <Link className='btn-blue-outline  w-full md:w-36' to={"/projects/add"}>
              {t('user2')}
            </Link>
          }
        </div>
    }

      </div>    

     </div>
  
   
  )
}


