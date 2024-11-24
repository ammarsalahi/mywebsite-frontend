import React from 'react'
import Lottie from 'react-lottie-player'
import nolist from '../../assets/lotties/box-empty.json'
import { useTranslation } from 'react-i18next'

export default function EmptyList(props:{name:string}) {
    const {t}=useTranslation()

  return (
        <div className='no-list'>
            <div className='flex justify-center'>
                <Lottie
                animationData={nolist}
                loop
                play
                style={{height:300,width:300}}
                />
            </div>
            <div className="flex justify-center">
                <div className=" p-2 lg:p-4 bg-red-300 text-center rounded-lg w-96">
                <p className='text-xl text-red-600'>{t(`${props.name}`)}</p>
                </div>
            </div>
        
        </div>
  )
}
