
import { Button } from 'antd'
import VerticalCard from './VerticalCard'
import { useRecoilValue } from 'recoil';
import { themeSelector } from '../states/Selectors';
import { TfiReload } from 'react-icons/tfi';

interface listprops{
  posts:[]|any;
}
export default function LastPosts(props:listprops) {

  const theme=useRecoilValue(themeSelector)
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
            <VerticalCard post={item} theme={theme} deletePost={()=>{}}/>
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


