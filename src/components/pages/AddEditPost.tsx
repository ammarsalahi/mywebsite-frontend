import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import { PiCameraPlus, PiCameraPlusFill, PiNewspaperFill } from 'react-icons/pi'
import { useParams } from 'react-router-dom'
import EditPost from '../posts/EditPost'
import AddPost from '../posts/AddPost'

export default function AddEditPost() {
  let {id}:any=useParams()

  
  return (
    <div>
      {id?
        <EditPost id={id}/>
        :
        <AddPost/>
      }
    </div>
  )
}
