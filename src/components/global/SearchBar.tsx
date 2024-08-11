import React, { useState } from 'react'
import { AiOutlineSearch  } from 'react-icons/ai'

export default function SearchBar() {
  const [search,setSearch]=useState("");
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
       setSearch(e.target.value)
  }
  return (
    <div className='pt-5 pb-3 lg:px-20 flex justify-center '>
         <label className="input input-sm input-bordered bg-transparent input-primary rounded-full  w-96 flex items-center gap-2">
            <AiOutlineSearch fontSize={20}/>
            <input 
              type="text" 
              className="py-2" 
              placeholder="جستجو..."
              value={search}
              onChange={handleSearch}
            />
        </label>
    </div>
  )
}
