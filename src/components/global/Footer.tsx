import React,{useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Footer() {
  const location=useLocation()

  return (
    <div className={location.pathname=='/'?'bg-blue-500  w-full':'bg-gray-50 border-t w-full'}>
      <div className="py-20">
        
      </div>
    </div>
  )
}
