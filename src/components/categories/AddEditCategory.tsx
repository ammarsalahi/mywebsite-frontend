import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { Api } from '../api/Index';
import { CATEGORIES, CATEGORIES_ID } from '../api/Endpoints';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import { categorySelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';

interface modalProps{
    type:string;
    reload:()=>void;

}
export default function AddEditCategory(props:modalProps) {
  const modalElement = document.getElementById('catmodal') as HTMLDialogElement | null;
  const cat=useRecoilValue(categorySelector)
  const [name,setName]=useState<string>("");
  const [engname,setEngName]=useState<string>("");
  const {t} = useTranslation();


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
        message.error(t('notaccepted'))
      })
  }
  const handleEdit=()=>{
    Api.patch(CATEGORIES_ID(cat.id),{name:name,english_name:engname}).then((res)=>{
      props.reload()
      setName("");
      setEngName("")
      modalElement?.close()
    }).catch((err)=>{
      message.error(t('notaccepted'))
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
             <h3 className="font-bold text-lg text-center">{props.type=="add"?t("addcat"):t("editcat")}</h3>
              <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-4 md:py-10 md:px-5'>
              <input 
                  type="text" value={name} onChange={handleChangeName}
                  className='input input-bordered w-full rounded-2xl mb-5' 
                  placeholder={t('entercatname')} />
              <input 
                  type="text" value={engname} onChange={handleChangeEnglishName}
                  className='input input-bordered w-full rounded-2xl mb-5' 
                  placeholder={t('entercateng')} />    
              <div className="flex items-center justify-between gap-3" dir="rtl">
                <button 
                    className='btn-blue w-40  md:w-52 rounded-2xl' type='button' disabled={name.length==0 || engname.length==0} 
                    onClick={cat.id==0?handleAdd:handleEdit}
                >
                  {t('agree')}
                </button>
                <button className='btn-red w-40 md:w-52 rounded-2xl' type='button' onClick={handleClose}>
                  {t('cancel')}
                </button>
              </div>
            </div>
        </div>
    </dialog>
  )
}
