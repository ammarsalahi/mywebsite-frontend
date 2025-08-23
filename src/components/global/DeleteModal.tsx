import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { Api } from '../api/Index';
import { CATEGORIES, CATEGORIES_ID, SOCIALS } from '../api/Endpoints';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import { categorySelector, tokenSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';

interface modalProps{
  id:number;  
  close:any;
}
export default function DeleteModal(props:modalProps) {
  const token=useRecoilValue(tokenSelector)

  const {t} = useTranslation();

  const handleClose=()=>{
    props.close();
  }


 


  return (
    <dialog id={"delmodal"} className="modal">
        <div className="modal-box py-3">
          <div className="flex justify-between ps-5 items-center">
             <h3 className="font-bold text-lg text-center">حذف</h3>
              <button className='btn btn-circle btn-ghost text-2xl' onClick={handleClose}>
                <CgClose/>
              </button>
          </div>
            <div className='py-4 md:py-10 md:px-5 space-y-5  p-0'>
               
              <div className="flex justify-between items-center  gap-3" dir="rtl">
                <button 
                    className='btn-red w-[50%] md:w-52 rounded-2xl' type='button' 
                >
                  {t('agree')}
                </button>
                <button className='btn  w-[50%] md:w-52 rounded-2xl' type='button' onClick={handleClose}>
                  {t('cancel')}
                </button>
              </div>
            </div>
        </div>
    </dialog>
  )
}
