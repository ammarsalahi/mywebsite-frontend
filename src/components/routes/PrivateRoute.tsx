import React from 'react'
import { Navigate } from 'react-router-dom';

type props={
    children:React.ReactNode;
}
export default function PrivateRoute({children}:props) {
   const auth=true; 
  return (
    <>
        {auth==true?
          <div>
          {children}
          </div>
         :
         <div>
            <Navigate to='/login'/> 
         </div>
        }
    </>
  )
}
