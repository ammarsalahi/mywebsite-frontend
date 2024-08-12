
import { Button } from 'antd'
import VerticalCard from './VerticalCard'

interface listprops{
  posts:[]|any;
}
export default function LastPosts(props:listprops) {
  return (
    <div className='lasts'>
        <div className='flex justify-start py-3 px-3 border-r-4 mb-10 border-blue-500 '>
            <p className='text-3xl'>پست‌های اخیر</p>
        </div>
    <div>
      
    {props.posts?.length>0 ?
        <> 
          <div className='last-list'>
          {props.posts?.map((item:any,idx:number)=>(
            <div key={idx}>
            <VerticalCard post={item}/>
            </div>
          ))}
        </div>
        {props.posts?.length > 4 && <div className="flex justify-center py-10">
            <Button size='large' type='primary' className=' text-xl  rounded-full' iconPosition='end'>بیشتر</Button>
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


