import React from 'react'
import { useParams } from 'react-router-dom';
import { themeSelector } from '../states/Selectors';
import { useRecoilValue } from 'recoil';
import AddAbout from '../about/AddAbout';
import EditAbout from '../about/EditAbout';

export default function AddEditAbout() {
    let {username}:any=useParams();
    const theme=useRecoilValue(themeSelector)

  return (
    <div>
      {username?
        <EditAbout id={username} theme={theme}/>
      :  <AddAbout theme={theme}/>}
    </div>
  )
}
