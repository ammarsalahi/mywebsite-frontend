import React from 'react'
import Navbar from '../global/Navbar';
import { useRecoilValue } from 'recoil';
import { menuSelector,pageLoadSelector,themeSelector } from '../states/Selectors';
import MenuList from '../global/MenuList';


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
        <div className={theme=="dark"?"bg-gray-900 text-white":"bg-gray-50"}>
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
