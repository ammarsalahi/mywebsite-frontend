import React from 'react'
import { FaCheck, FaHammer, FaPlus } from 'react-icons/fa6'
import { PiCameraPlusFill } from 'react-icons/pi'
import { useParams } from 'react-router-dom'
import EditProject from '../projects/EditProject'
import AddProject from '../projects/AddProject'

export default function AddEditProject() {
  let {id}:any=useParams()
  return (
    <div>
        {id?
          <EditProject id={id}/>
        :
        <AddProject/>
        }
    </div>
  )
}
