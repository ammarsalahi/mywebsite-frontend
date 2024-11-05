
import { Button, message } from 'antd'
import VerticalCard from './VerticalCard'
import { useRecoilValue } from 'recoil';
import { themeSelector } from '../states/Selectors';
import { TfiReload } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import { POSTS_ID } from '../api/Endpoints';
import { Api } from '../api/Index';

interface listprops{
  posts:[]|any;
  reload:()=>void;
  theme:string
}
export default function LastPosts(props:listprops) {


  const handleDelete=(id:string,titles:string)=>()=>{
    Swal.fire({
      title:"آیا میخواهید پست موردنظر حذف شود؟!",
      text:`${titles}`,
      icon:"error",
      confirmButtonText:"بله",
      confirmButtonColor:"red",
      cancelButtonText:"نه,بیخیال",
      showCancelButton:true

    }).then((result)=>{
      if(result.isConfirmed){
        Api.delete(POSTS_ID(id)).then(()=>{
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
        <div className='flex justify-start py-3 px-3 border-r-4 mb-5 border-blue-500 '>
            <p className='text-3xl font-bold'>پست‌های اخیر</p>
        </div>
    <div>
      
    {props.posts?.length>0 ?
        <> 
          <div className='last-list'>
          {props.posts?.map((item:any,idx:number)=>(
            <div key={idx} className='py-4'>
            <VerticalCard post={item} theme={props.theme} deletePost={handleDelete(item.post_id,item.title)}/>
            </div>
          ))}
        </div>
        {props.posts?.length > 4 && <div className="flex justify-center py-3">
            <button className='btn-blue w-36 gap-3 rounded-2xl font-bold text-xl'>
              <TfiReload/>
              بیشتر
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

   
     </div>
  
   
  )
}


