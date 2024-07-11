import React from 'react'
import Navbar from '../global/Navbar'
import AddPost from '../posts/AddPost'
import { useParams } from 'react-router-dom'
import EditPost from '../posts/EditPost';

export default function AddEditPost() {
  const {id}=useParams();
  return (
    <div>
      <Navbar/>
      {id ?
      <EditPost id={id}/>
      :<AddPost/>}
    </div>
  )
}
