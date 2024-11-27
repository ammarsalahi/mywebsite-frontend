import React from 'react'
import Navbar from '../global/Navbar';
import { useRecoilValue } from 'recoil';
import { themeSelector, tokenSelector } from '../states/Selectors';
import { Navigate } from 'react-router-dom';

type props={
    children:React.ReactNode;
}
export default function PrivateRouteContainer({children}:props) {
  const token=useRecoilValue(tokenSelector)
  const theme=useRecoilValue(themeSelector)

  return (
    <div>
      {token.access.length>0? 
        <div>
          <Navbar/>
          <div className={theme=="dark"?"bg-gray-900 text-white pt-24 pb-10 px-16":"bg-gray-50 pt-24 pb-10 px-16"}>
            {children}
          </div>
        </div>
      :
      <Navigate to={"/signin"}/>
      }  
    </div>
  )
}
