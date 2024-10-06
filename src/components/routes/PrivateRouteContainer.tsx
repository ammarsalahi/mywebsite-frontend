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
  let toke="ok"
  return (
    <div>
      {toke.length>0? 
        <div>
          <Navbar/>
          <div className="pt-24 pb-10 px-20">
            {children}
          </div>
        </div>
      :
      <Navigate to={"/signin"}/>
      }  
    </div>
  )
}
