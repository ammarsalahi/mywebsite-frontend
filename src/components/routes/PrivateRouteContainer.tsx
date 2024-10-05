import React from 'react'
import Navbar from '../global/Navbar';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';
import { Navigate } from 'react-router-dom';

type props={
    children:React.ReactNode;
}
export default function PrivateRouteContainer({children}:props) {
  const token=useRecoilValue(tokenSelector)
  return (
    <div>
      {token?.access.length>0? 
        <div>
          <Navbar/>
          <div className="pt-32 pb-14 px-32">
            {children}
          </div>
        </div>
      :
      <Navigate to={"/signin"}/>
      }  
    </div>
  )
}
