import React, { useState } from 'react'
import Navbar from '../global/Navbar'
import { Button, Input } from 'antd'
import { AiOutlineAppstore, AiOutlineClose, AiOutlineFire, AiOutlinePlus, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineUnorderedList } from 'react-icons/ai'
import { PiFireFill } from 'react-icons/pi'
import VerticalCard from '../posts/VerticalCard'
import { useNavigate } from 'react-router-dom'

export default function Posts() {
   let navigate=useNavigate()
  const [filters,setFilters]=useState({
    'ascend':false,
    'cards':false,
    'lists':false,
    'news':false,
    'search':false,
  })
  const handleChange=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
      setFilters({...filters,[name]:!status})
  }
  return (
    <div>
        <Navbar/>
        <div className='px-20 pt-5'>
            <div className="flex justify-start mb-3">
               <Button 
                  size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                  className={filters.ascend==true?'text-green-600':''} 
                  onClick={handleChange('ascend',filters.ascend)}
                  type='text'
                >صعودی</Button>

               <Button 
                  size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                  className={filters.ascend==false?'text-red-600':''}
                  onClick={handleChange('ascend',filters.ascend)}
                  type='text'>نزولی</Button>
               <Button 
                  size='large' icon={<AiOutlineAppstore fontSize={20}/>} 
                  className={filters.cards==true?'text-blue-600':''} 
                  onClick={handleChange('cards',filters.cards)}
                  type='text'>جدولی</Button>
               <Button 
                  size='large' icon={<AiOutlineUnorderedList fontSize={20}/>} 
                  className={filters.lists==true?'text-purple-600':''} 
                  onClick={handleChange('lists',filters.lists)}
                  type='text'>لیستی</Button>
               <Button 
                  size='large' icon={<PiFireFill fontSize={20}/>} 
                  className={filters.news?'text-orange-600':''} 
                  onClick={handleChange('news',filters.news)}
                  type='text'>تازه‌ها</Button>
               {/* <Button size='large' icon={<AiOutlineSearch fontSize={20}/>} type='text'/> */}
               <Input allowClear size='large' placeholder="جستجو..." variant='borderless' prefix={<AiOutlineSearch fontSize={20}/>}/> 
               <Button
                  size='large' icon={<AiOutlinePlus fontSize={20}/>} 
                  type='primary' className='rounded-full ms-10'
                  onClick={()=>navigate('/posts/add')}
                  >افزودن</Button>

            </div>
            <hr/>
            <div className='grid grid-cols-4 gap-5 py-10'>
               <VerticalCard/>
               <VerticalCard/>
               <VerticalCard/>
               <VerticalCard/>

            </div>
        </div>
    </div>
  )
}
