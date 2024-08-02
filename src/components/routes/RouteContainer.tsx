import React from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from '../global/Navbar';
import { useRecoilValue } from 'recoil';
import { menuSelector,themeSelector } from '../states/Selectors';
import MenuList from '../global/MenuList';
type props={
    children:React.ReactNode;
}
export default function RouteContainer({children}:props) {
  const menu=useRecoilValue(menuSelector)
  const theme=useRecoilValue(themeSelector)

  return (
  
    <div style={{height:'100vh'}}>
       <Navbar/>
       {menu==true?
        <MenuList/>
        :
        <div className={theme=="dark"?"bg-gray-800 text-white":""}>
        {children}
        </div>
      }
    </div>
  )
}
