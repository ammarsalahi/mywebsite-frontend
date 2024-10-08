import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { AiOutlineAppstore, AiOutlineClose, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineUnorderedList } from 'react-icons/ai'
import { filterSelector, postSearchSelector } from '../states/Selectors'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PiFireFill } from 'react-icons/pi'
import { menuSelector ,islodingselector} from '../states/Selectors'

export default function PostFilter() {
    
    const [filters,setFilters]=useRecoilState(filterSelector);
    const [isload,setisload]=useRecoilState(islodingselector)
    const ismenu=useRecoilValue(menuSelector)
    const [isSearch,setisSearch]=useState(false);
    const [search,setSearch]=useRecoilState(postSearchSelector);

    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
    const handleFilters=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
        setisload(false)
        setFilters({...filters,[name]:status})
    }
  return (
    <div>

    <div className="post-filter">
                     <button className={filters.assort?'btn btn-ghost text-green-600':'btn btn-ghost'}
                      onClick={handleFilters('assort',true)}
                     >
                        <AiOutlineSortAscending fontSize={20}/>
                        صعودی
                     </button>

                     <button 
                     className={filters.assort==false?'btn btn-ghost text-red-600':'btn btn-ghost'}
                      onClick={handleFilters('assort',false)}
                     >
                        <AiOutlineSortDescending fontSize={20}/>
                        نزولی
                     </button>

                       <button 
                     className={filters.list==false?'btn btn-ghost text-blue-600':'btn btn-ghost'}
                      onClick={handleFilters('list',false)}
                     >
                        <AiOutlineAppstore fontSize={20}/>
                        جدولی
                     </button>
                       <button 
                     className={filters.list?'btn btn-ghost text-purple-600':'btn btn-ghost'}
                      onClick={handleFilters('list',true)}
                     >
                        <AiOutlineUnorderedList fontSize={20}/>
                        لیستی
                     </button>
                    <button 
                     className={filters.news?'btn btn-ghost text-orange-700':'btn btn-ghost'}
                      onClick={handleFilters('news',!filters.news)}
                     >
                        <PiFireFill fontSize={20}/>
                        تازه‌ها
                     </button>
                       <label className="input input-sm input-bordered p-2 w-96 rounded-full  mt-2 input-bordered flex items-center gap-2">
                        <AiOutlineSearch fontSize={20}/>
                        <input 
                          type="text" className="grow" 
                          placeholder="جستجو..."
                          value={search}
                          onChange={handleSearch}                             
                        />
                      </label>
                     
        </div>
        {ismenu==false &&
        <div>
         {isSearch==true? 
          <div className='p-1 pt-4 flex gap-2 '>
             <Input
              allowClear size='large' 
              placeholder="جستجو..." 
              variant='borderless' 
              value={search}
              onChange={handleSearch}    
              prefix={<AiOutlineSearch fontSize={22} className="text-gray-500"/>}/> 
            <button
            className="btn btn-sm btn-ghost"
             onClick={()=>setisSearch(false)}
            >
            <AiOutlineClose fontSize={25}/>
            </button>          
          </div>
        :<div className='post-filter-sm'>
          <button className={filters.assort?'btn btn-ghost text-green-600':'btn btn-ghost'}
               onClick={handleFilters('assort',true)}
          >
            <AiOutlineSortAscending fontSize={30}/>
         
          </button>
          <button 
            className={filters.assort==false?'btn btn-ghost text-red-600':'btn btn-ghost'}
            onClick={handleFilters('assort',false)}
          >
                 <AiOutlineSortDescending fontSize={30}/>
            </button>
              <button 
             className={filters.news?'btn btn-ghost text-orange-700':'btn btn-ghost'}
             onClick={handleFilters('news',!filters.news)}
              >
               <PiFireFill fontSize={20}/>
            </button>
            <button
              className="btn btn-ghost"
             onClick={()=>setisSearch(true)}
            >
            <AiOutlineSearch fontSize={30}/>
            </button>         
        </div>
        }
        </div>
       }
    </div>
    )
}
