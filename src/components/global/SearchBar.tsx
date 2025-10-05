import React, { useState } from 'react'
import { AiOutlineSearch  } from 'react-icons/ai'
import { useNavigate} from 'react-router-dom';

export default function SearchBar() {
  let navigate=useNavigate();
  const [search,setSearch]=useState("");


  const handleSearch=(event:React.ChangeEvent<HTMLInputElement>)=>{
       setSearch(event.target.value)
  }
  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
        navigate(`/search/${search}`)
    }
  }
  const handleOnClick=()=>{
       navigate(`/search/${search}`);
       setSearch("")
  }
  return (
    <div className='pt-5 pb-3 px-5 flex justify-center '>
        <div className="dropdown dropdown-bottom">
         <label className="input input-sm input-bordered bg-transparent  rounded-full w-full md:w-96 flex items-center gap-2">
            <AiOutlineSearch fontSize={20}/>
            <input 
              type="text" 
              className="py-2" 
              placeholder="جستجو..."
              value={search}
              onChange={handleSearch}
              onKeyDown={handleSubmit}
            />
        </label>
         {search.length>0 &&<ul tabIndex={0} className=" mt-2 dropdown-content menu bg-white text-black rounded-xl z-[1] w-full p-2 shadow">
              <li className="p-3 hover:bg-gray-100 rounded-xl cursor-pointer" onClick={handleOnClick}>جستجو برای "{search}"</li>
            </ul>}
        </div>
    </div>
  )
}
