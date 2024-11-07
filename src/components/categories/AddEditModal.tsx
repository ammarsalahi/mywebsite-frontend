import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { Api } from '../api/Index';
import { CATEGORIES, CATEGORIES_ID } from '../api/Endpoints';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import { categorySelector } from '../states/Selectors';

interface modalProps{
    type:string;
    reload:()=>void;

}
export default function AddEditModal(props:modalProps) {
  const modalElement = document.getElementById('catmodal') as HTMLDialogElement | null;
  const cat=useRecoilValue(categorySelector)
  const [name,setName]=useState<string>("");
  const [engname,setEngName]=useState<string>("");


  const handleChangeName=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value)
  }
  const handleChangeEnglishName=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setEngName(e.target.value)
  }

  const handleClose=()=>{
    modalElement?.close();
  }

  const handleAdd=()=>{
      Api.post(CATEGORIES,{name:name,english_name:engname}).then((res)=>{
        props.reload()
        setName("");
        setEngName("")
        modalElement?.close()
      }).catch((err)=>{
        message.error("متاسفانه مشکلی پیش آمد!")
      })
  }
  const handleEdit=()=>{
    Api.patch(CATEGORIES_ID(cat.id),{name:name,english_name:engname}).then((res)=>{
      props.reload()
      setName("");
      setEngName("")
      modalElement?.close()
    }).catch((err)=>{
      message.error("متاسفانه مشکلی پیش آمد!")
    })
  }

  useEffect(()=>{
    if(props.type=="edit"){
      setName(cat.name)
      setEngName(cat.english)
    }
  },[cat])


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
              <input 
                  type="text" value={engname} onChange={handleChangeEnglishName}
                  className='input input-bordered w-full rounded-2xl mb-5' 
                  placeholder='نام دسته‌بندی انگلیسی را وارد کنید...' />    
              <div className="flex items-center gap-3">
                <button 
                    className='btn-blue w-52 rounded-2xl' type='button' disabled={name.length==0} 
                    onClick={cat.id==0?handleAdd:handleEdit}
                >
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
