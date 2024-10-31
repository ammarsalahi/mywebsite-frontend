import { Input } from 'antd'
import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending,AiOutlineClose } from 'react-icons/ai'
import { useRecoilState, useRecoilValue } from 'recoil'
import { menuSelector, projectSearchSelector, projfilterSelector } from '../states/Selectors'

export default function ProjectFilters() {
    const [projfilters,setprojFilters]=useRecoilState(projfilterSelector)
    const ismenu=useRecoilValue(menuSelector)
    const [isSearch,setisSearch]=useState(false)
    const [search,setSearch]=useRecoilState(projectSearchSelector)

    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value)
    }
    const handleProjectFilters=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
        setprojFilters({...projfilters,[name]:status})
    }
  return (
    <div>

        <div className="project-filter">
        <p className='pe-24 text-2xl font-bold'>پروژه‌ها</p>

                    <button className={projfilters.assort?'btn btn-ghost text-green-600':'btn btn-ghost'}
                       onClick={handleProjectFilters('assort',true)}
                     >
                       <AiOutlineSortAscending fontSize={20}/>
                        صعودی
                     </button>
                     
                     <button 
                     className={projfilters.assort==false?'btn btn-ghost text-red-600':'btn btn-ghost'}
                      onClick={handleProjectFilters('assort',false)}
                     >
                        <AiOutlineSortDescending fontSize={20}/>
                        نزولی
                     </button>
                 
                    <label className="input input-sm  p-2 w-96 rounded-full  mt-2 input-bordered flex items-center gap-2">
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
                <div className='p-1 pt-4 flex gap-2'>
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
        : <div className='project-filter-sm'>
                 <button className={projfilters.assort?'btn btn-ghost text-green-600':'btn btn-ghost'}
                       onClick={handleProjectFilters('assort',true)}
                     >
                       <AiOutlineSortAscending fontSize={32}/>
                     </button>
                     
                     <button 
                     className={projfilters.assort==false?'btn btn-ghost text-red-600':'btn btn-ghost'}
                      onClick={handleProjectFilters('assort',false)}
                     >
                        <AiOutlineSortDescending fontSize={32}/>
                     </button>
                    <button 
                     className='btn btn-ghost'
                      onClick={()=>setisSearch(true)}
                     >
                        <AiOutlineSearch fontSize={32}/>
                     </button>
                      
          </div>
        }
        </div>
        }
          
    </div>)
}
