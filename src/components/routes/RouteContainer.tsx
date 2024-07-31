import React from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from '../global/Navbar';
import { useRecoilValue } from 'recoil';
import { menuSelector } from '../states/Selectors';
import MenuList from '../global/MenuList';
type props={
    children:React.ReactNode;
}
export default function RouteContainer({children}:props) {
  const menu=useRecoilValue(menuSelector)
  return (
  
    <div style={{height:'100vh'}}>
       <Navbar/>
       {menu==true?
        <MenuList/>
        :
        <>
        {children}
        </>
      }
    </div>
  )
}
