import React from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from '../global/Navbar';
import { useRecoilValue } from 'recoil';
import { menuSelector,pageLoadSelector,themeSelector } from '../states/Selectors';
import MenuList from '../global/MenuList';
import {motion} from 'framer-motion'
import logo from '../../assets/icon-blue2.png'
import logolight from '../../assets/icon-light.png'


type props={
    children:React.ReactNode;
}
export default function RouteContainer({children}:props) {
  const menu=useRecoilValue(menuSelector)
  const theme=useRecoilValue(themeSelector)
  const pageLoad=useRecoilValue(pageLoadSelector)
  
  
  return (
  
    <div className="h-screen">
     {pageLoad ?
      <div>
       <Navbar/>
       {menu==true?
        <MenuList/>
        :
        <div className={theme=="dark"?"bg-gray-800 text-white":"bg-gray-100"}>
             {children}
        </div>
      }
      </div>
      :
      <>
      
      {children}
      </>
    }
      
    </div>
  )
}
