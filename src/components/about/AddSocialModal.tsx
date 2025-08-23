import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { Api } from '../api/Index';
import { CATEGORIES, CATEGORIES_ID, SOCIALS } from '../api/Endpoints';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import { categorySelector, tokenSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';

interface modalProps{
  addsocial:any;
  close:any;

}
export default function AddSocialModal(props:modalProps) {
  // const modalElement = document.getElementById('socialmodal') as HTMLDialogElement | null;
  const cat=useRecoilValue(categorySelector)
  const token=useRecoilValue(tokenSelector)

  const [name,setName]=useState<string>("");
  const [url,setUrl]=useState<string>("");

  const {t} = useTranslation();


  const handleChangeName=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value)
  }
  const handleChangeUrl=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setUrl(e.target.value)
  }

  const HandleClear=()=>{
    setName("")
    setUrl("");
  }
  const handleClose=()=>{
    HandleClear()
    props.close();
  }

  const handleAdd=()=>{
          const formdata=new FormData();
          formdata.append("name",name);
          formdata.append("link",url)
          formdata.append("status",`TO ADD ${token.user}`);
          Api.post(SOCIALS,formdata).then((res)=>{
              props.addsocial(res.data)
              HandleClear()
          }).catch((err)=>{
            console.log(err)
            message.error(t('notaccepted'))
      
          })
  }
 


  return (
    <dialog id={"socialmodal"} className="modal">
        <div className="modal-box py-3">
          <div className="flex justify-between ps-5 items-center">
             <h3 className="font-bold text-lg text-center">{t('addsocial')}</h3>
              <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-4 md:py-10 md:px-5 space-y-5 p-0'>
              <input 
                  type="text" value={name} onChange={handleChangeName}
                  className='input input-bordered w-full rounded-2xl' 
                  placeholder={t('soname')} />
              <input 
                  type="text" value={url} onChange={handleChangeUrl}
                  className='input input-bordered w-full rounded-2xl' 
                  placeholder={t('liname')} />    
              <div className="md:flex items-center space-y-3 md:space-y-0 md:gap-3" dir="rtl">
                <button 
                    className='btn-blue w-full md:w-52 rounded-2xl' type='button' disabled={name.length==0 || url.length==0} 
                    onClick={handleAdd}
                >
                  {t('agree')}
                </button>
                <button className='btn-red w-full md:w-52 rounded-2xl' type='button' onClick={handleClose}>
                  {t('cancel')}
                </button>
              </div>
            </div>
        </div>
    </dialog>
  )
}
