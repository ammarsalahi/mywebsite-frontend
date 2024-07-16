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
        setprojFilters({...projfilters,[name]:!status})
    }
  return (
    <div>

        <div className="project-filter">
                    <Button
                       size='large' icon={<AiOutlineSortAscending fontSize={20}/>} 
                       className={projfilters.assort==true?'text-green-600':''} 
                       onClick={handleProjectFilters('assort',true)}
                       type='text'
                     >صعودی</Button>
     
                    <Button 
                       size='large' icon={<AiOutlineSortDescending fontSize={20}/>} 
                       className={projfilters.assort==false?'text-red-600':''}
                       onClick={handleProjectFilters('assort',false)}
                       type='text'>نزولی</Button>
                    
                    <Input allowClear size='large' placeholder="جستجو..." variant='borderless' 
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
        : <div className='project-filter-sm'>
                <Button
                       size='large' icon={<AiOutlineSortAscending fontSize={30}/>} 
                       className={projfilters.assort==true?'text-green-600':''} 
                       onClick={handleProjectFilters('assort',projfilters.assort)}
                       type='text'
                     />
     
                    <Button 
                       size='large' icon={<AiOutlineSortDescending fontSize={30}/>} 
                       className={projfilters.assort==false?'text-red-600':''}
                       onClick={handleProjectFilters('assort',projfilters.assort)}
                       type='text'/>
                     <Button 
                      size='large' icon={<AiOutlineSearch fontSize={22}/>} 
                     
                      onClick={()=>setisSearch(true)}
                      type='text'/>   
          </div>
        }
        </div>
        }
          
    </div>)
}
