import React from 'react'
import { useParams } from 'react-router-dom';
import { themeSelector } from '../states/Selectors';
import { useRecoilValue } from 'recoil';
import AddAbout from '../about/AddAbout';

export default function AddEditAbout() {
    let {id}:any=useParams();
    const theme=useRecoilValue(themeSelector)

  return (
    <div>
        <AddAbout theme={theme}/>
    </div>
  )
}
