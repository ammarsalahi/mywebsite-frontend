import React from 'react'
import { Navigate } from 'react-router-dom';

type props={
    children:React.ReactNode;
}
export default function PrivateRoute({children}:props) {
   const auth=true; 
  return (
    <>
        {auth?
          {children}
         :
         <div>
            <Navigate to='/login'/> 
         </div>
        }
    </>
  )
}
