import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { AiOutlineAppstore, AiOutlineClose, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineUnorderedList } from 'react-icons/ai'
import { filterAtom } from '../states/Atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PiFireFill } from 'react-icons/pi'
import { menuSelector } from '../states/Selectors'

export default function PostFIlter() {
    
    const [filters,setFilters]=useRecoilState(filterAtom);
    const ismenu=useRecoilValue(menuSelector)
    const [isSearch,setisSearch]=useState(false)

    const handleFilters=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
        setFilters({...filters,[name]:status})
    }
  return (
    <div>

    <div className="post-filter">
                   <Button
                      size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                      className={filters.assort==true?'text-green-600':''} 
                      onClick={handleFilters('assort',filters.assort)}
                      type='text'>صعودی</Button>
    
                   <Button 
                      size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                      className={filters.assort==false?'text-red-600':''}
                      onClick={handleFilters('assort',filters.assort)}
                      type='text'>نزولی</Button>
                   <Button 
                      size='large' icon={<AiOutlineAppstore fontSize={20}/>} 
                      className={filters.list==false?'text-blue-600':''} 
                      onClick={handleFilters('list',filters.list)}
                      type='text'>جدولی</Button>
                   <Button 
                      size='large' icon={<AiOutlineUnorderedList fontSize={20}/>} 
                      className={filters.list==true?'text-purple-600':''} 
                      onClick={handleFilters('list',filters.list)}
                      type='text'>لیستی</Button>
                   <Button 
                      size='large' icon={<PiFireFill fontSize={20}/>} 
                      className={filters.news?'text-orange-600':''} 
                      onClick={handleFilters('news',filters.news)}
                      type='text'>تازه‌ها</Button>
                   <Input
                      allowClear size='large' 
                      placeholder="جستجو..." 
                      variant='borderless' 
                      prefix={<AiOutlineSearch fontSize={20}/>}/> 
        </div>
        {ismenu==false &&
        <div>
         {isSearch==true? 
          <div className='p-1 pt-4 flex gap-2'>
             <Input
                      allowClear size='large' 
                      placeholder="جستجو..." 
                      variant='borderless' 
                      className='bg-gray-50'
                      prefix={<AiOutlineSearch fontSize={22}/>}/> 
            <Button 
            type='text'
            icon={<AiOutlineClose fontSize={25}/>}
            onClick={()=>setisSearch(false)}
            />          
          </div>
        :<div className='post-filter-sm'>
            <Button 
             size='large' icon={<AiOutlineSortAscending fontSize={24}/>} 
             className={filters.assort==true?'text-green-600':''}
             onClick={handleFilters('assort',true)}
             type='text'
            />
                 <Button 
                      size='large' icon={<AiOutlineSortDescending fontSize={24}/>} 
                      className={filters.assort==false?'text-red-600':''}
                      onClick={handleFilters('assort',false)}
                      type='text'/>
                   <Button 
                      size='large' icon={<AiOutlineAppstore fontSize={24}/>} 
                      className={filters.list==false?'text-blue-600':''} 
                      onClick={handleFilters('list',false)}
                      type='text'/>
                   <Button 
                      size='large' icon={<AiOutlineUnorderedList fontSize={24}/>} 
                      className={filters.list==true?'text-purple-600':''} 
                      onClick={handleFilters('list',true)}
                      type='text'/>
                   <Button 
                      size='large' icon={<PiFireFill fontSize={24}/>} 
                      className={filters.news?'text-orange-600':''} 
                      onClick={handleFilters('news',filters.news==true?false:true)}
                      type='text'/>
                       <Button 
                      size='large' icon={<AiOutlineSearch fontSize={24}/>} 
                     
                      onClick={()=>setisSearch(true)}
                      type='text'/>
                   
        </div>
        }
        </div>
       }
    </div>
    )
}
