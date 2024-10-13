import React from 'react'
import { FaCheck, FaHammer, FaPlus } from 'react-icons/fa6'
import { PiCameraPlusFill } from 'react-icons/pi'
import { useParams } from 'react-router-dom'
import EditProject from '../projects/EditProject'
import AddProject from '../projects/AddProject'
import { useRecoilValue } from 'recoil'
import { themeSelector } from '../states/Selectors'

export default function AddEditProject() {
  let {id}:any=useParams();
  const theme=useRecoilValue(themeSelector)

  return (
    <div>
        {id?
          <EditProject id={id} theme={theme}/>
        :
        <AddProject theme={theme}/>
        }
    </div>
  )
}
