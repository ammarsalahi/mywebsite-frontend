import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending,AiOutlineClose } from 'react-icons/ai'
import { projfilterAtom } from '../states/Atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PiFireFill } from 'react-icons/pi'
import { menuSelector } from '../states/Selectors'

export default function ProjectFilters() {
    const [projfilters,setprojFilters]=useRecoilState(projfilterAtom)
    const ismenu=useRecoilValue(menuSelector)
    const [isSearch,setisSearch]=useState(false)
    const handleProjectFilters=(name:string,status:boolean)=>(e:React.MouseEvent<HTMLElement>)=>{
        setprojFilters({...projfilters,[name]:status})
    }
  return (
    <div>

        <div className="project-filter">
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
                 
                     <label class="input input-sm mt-2 input-ghost border-0 max-w-xs w-full flex items-center gap-5">
                        <AiOutlineSearch fontSize={20}/>
                        <input type="text" class="grow" placeholder="جستجو..." />
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
