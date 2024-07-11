import React from 'react'
import Navbar from '../global/Navbar'
import AddProject from '../projects/AddProject'
import EditProject from '../projects/EditProject';
import { useParams } from 'react-router-dom';


export default function AddEditProject() {
  const {id}=useParams();

  return (
    <div>
        <Navbar/>
        {id ?
          <EditProject id={id}/>
         :
        <AddProject/>}
    </div>
  )
}
