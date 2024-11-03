import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';

interface modalProps{
    type:string
}
export default function AddEditModal(props:modalProps) {
  const modalElement = document.getElementById('catmodal') as HTMLDialogElement | null;

  const [name,setName]=useState<string>("");

  const handleChangeName=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value)
  }
  const handleClose=()=>{
    modalElement?.close();
  }

  const handleAdd=()=>{
      
  }
  return (
    <dialog id={"catmodal"} className="modal">
        <div className="modal-box py-3">
          <div className="flex justify-between ps-5 items-center">
             <h3 className="font-bold text-lg text-center">{props.type=="add"?"افزودن دسته‌بندی‌":"ویرایش دسته‌بندی"}</h3>
              <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-10 px-5'>
              <input 
                  type="text" value={name} onChange={handleChangeName}
                  className='input input-bordered w-full rounded-2xl mb-5' 
                  placeholder='نام دسته‌بندی را وارد کنید...' />
              <div className="flex items-center gap-3">
                <button className='btn-blue w-52 rounded-2xl' type='button' disabled={name.length==0}>
                  تایید
                </button>
                <button className='btn-red w-52 rounded-2xl' type='button' onClick={handleClose}>
                  انصراف
                </button>
              </div>
            </div>
        </div>
    </dialog>
  )
}
