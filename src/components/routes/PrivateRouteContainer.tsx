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
      {token?.length>0? 
        <div>
          <Navbar/>
          <div className="pt-14">
            {children}
          </div>
        </div>
      :
      <Navigate to={"/signin"}/>
      }  
    </div>
  )
}
